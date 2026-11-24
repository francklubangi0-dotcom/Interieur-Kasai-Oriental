'use client';

import { useEffect, useState } from 'react';
import {
  newsCategories,
  type NewsCategory,
  type NewsItem,
} from '../data/news';
import { getOfficialDateString } from '../data/urgentNotices';
import {
  getSupabaseClient,
  loadAdminNews,
  subscribeToCmsTable,
  type NewsRow,
} from '../data/supabase';

type NewsFormValues = {
  date: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  body: string;
  imageAlt: string;
  imagePath: string;
  homeFeatured: boolean;
  carouselPosition: string;
  status: 'draft' | 'published';
};

const emptyForm: NewsFormValues = {
  date: getOfficialDateString(),
  category: 'ACTUALITÉ',
  title: '',
  excerpt: '',
  body: '',
  imageAlt: '',
  imagePath: '',
  homeFeatured: true,
  carouselPosition: '1',
  status: 'draft',
};

function formValues(item: NewsItem | null): NewsFormValues {
  if (!item) return emptyForm;
  return {
    date: item.date,
    category: item.category,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body ?? item.excerpt,
    imageAlt: item.imageAlt ?? item.title,
    imagePath: item.imagePath ?? '',
    homeFeatured: item.homeFeatured,
    carouselPosition: item.carouselPosition === null ? '' : String(item.carouselPosition),
    status: item.status,
  };
}

function makeSlug(title: string, date: string) {
  const normalizedTitle = title.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const titleSlug = normalizedTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  return `${date}-${titleSlug}`;
}

function isNewsCategory(value: string): value is NewsCategory {
  return newsCategories.some((category) => category === value);
}

function SupabaseError({ children }: { children: string }) {
  return <p className="admin-error" role="alert">{children}</p>;
}

export default function NewsAdminForm() {
  const supabase = getSupabaseClient();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [editing, setEditing] = useState<NewsItem | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  async function refresh() {
    try {
      const currentItems = await loadAdminNews();
      if (currentItems === null) {
        setError('La connexion à Supabase n’est pas configurée.');
        return;
      }
      setItems(currentItems);
      setError('');
    } catch (loadError) {
      console.error('Le chargement des actualités administrateur a échoué.', loadError);
      setError('Impossible de charger les actualités. Vérifiez la migration Supabase et les droits administrateur.');
    }
  }

  useEffect(() => {
    void refresh();
    return subscribeToCmsTable('news_articles', () => void refresh());
  }, []);

  function startEditing(item: NewsItem | null) {
    setEditing(item);
    setFormKey((key) => key + 1);
    setError('');
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setError('');
    setNotice('');

    const formData = new FormData(event.currentTarget);
    const title = String(formData.get('title') ?? '').trim();
    const date = String(formData.get('date') ?? '');
    const categoryValue = String(formData.get('category') ?? '');
    const excerpt = String(formData.get('excerpt') ?? '').trim();
    const body = String(formData.get('body') ?? '').trim();
    const imageAlt = String(formData.get('imageAlt') ?? '').trim();
    const statusValue = String(formData.get('status') ?? 'draft');
    const homeFeatured = formData.get('homeFeatured') === 'on';
    const carouselValue = String(formData.get('carouselPosition') ?? '');
    const carouselPosition = carouselValue ? Number(carouselValue) : null;
    const imageEntry = formData.get('image');
    const imageFile = imageEntry instanceof File && imageEntry.size > 0 ? imageEntry : null;
    let uploadedPath: string | null = null;

    if (!isNewsCategory(categoryValue)) {
      setError('Choisissez une catégorie valide.');
      setSaving(false);
      return;
    }
    if (statusValue !== 'draft' && statusValue !== 'published') {
      setError('Choisissez un statut valide.');
      setSaving(false);
      return;
    }
    if (imageFile && (!imageFile.type.startsWith('image/') || imageFile.size > 8 * 1024 * 1024)) {
      setError('Choisissez une image de 8 Mo maximum.');
      setSaving(false);
      return;
    }

    try {
      let imagePath = editing?.imagePath ?? '';
      if (imageFile) {
        const extension = imageFile.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg';
        const path = `${date}/${crypto.randomUUID()}.${extension}`;
        const { data, error: uploadError } = await supabase.storage
          .from('news-images')
          .upload(path, imageFile, { contentType: imageFile.type, upsert: false });
        if (uploadError) throw uploadError;
        imagePath = data.path;
        uploadedPath = data.path;
      }
      if (!imagePath && !editing) {
        setError('Ajoutez une photo de couverture pour cette nouvelle actualité.');
        setSaving(false);
        return;
      }

      const row: Omit<NewsRow, 'id' | 'created_at' | 'updated_at'> = {
        slug: editing?.slug ?? makeSlug(title, date),
        published_at: date,
        category: categoryValue,
        title,
        excerpt,
        body,
        image_url: imagePath,
        image_alt: imageAlt || title,
        homepage_featured: homeFeatured,
        carousel_position: carouselPosition,
        status: statusValue,
      };

      const { error: saveError } = await supabase.rpc('save_news_article', {
        p_id: editing?.id ?? null,
        p_slug: row.slug,
        p_published_at: row.published_at,
        p_category: row.category,
        p_title: row.title,
        p_excerpt: row.excerpt,
        p_body: row.body,
        p_image_url: row.image_url,
        p_image_alt: row.image_alt,
        p_homepage_featured: row.homepage_featured,
        p_carousel_position: row.carousel_position,
        p_status: row.status,
      });
      if (saveError) throw saveError;

      let cleanupWarning = false;
      if (uploadedPath && editing?.imagePath && editing.imagePath !== uploadedPath) {
        try {
          const { error: previousImageError } = await supabase.storage
            .from('news-images')
            .remove([editing.imagePath]);
          if (previousImageError) throw previousImageError;
        } catch (cleanupError) {
          console.error('L’ancienne image de l’actualité n’a pas pu être effacée.', cleanupError);
          cleanupWarning = true;
        }
      }

      startEditing(null);
      setNotice(cleanupWarning
        ? 'Actualité enregistrée, mais l’ancienne image n’a pas pu être effacée.'
        : statusValue === 'published' ? 'Actualité publiée sur le site.' : 'Brouillon enregistré.');
      await refresh();
    } catch (saveError) {
      console.error('L’enregistrement de l’actualité a échoué.', saveError);
      if (uploadedPath) {
        try {
          const { error: cleanupError } = await supabase.storage.from('news-images').remove([uploadedPath]);
          if (cleanupError) console.error('Le nettoyage de l’image non publiée a échoué.', cleanupError);
        } catch (cleanupError) {
          console.error('Le nettoyage de l’image non publiée a échoué.', cleanupError);
        }
      }
      setError('L’actualité n’a pas pu être enregistrée. Vérifiez les champs et la configuration Supabase.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: NewsItem) {
    if (!supabase || !window.confirm(`Supprimer « ${item.title} » ?`)) return;
    setError('');
    setNotice('');

    try {
      const { error: deleteError } = await supabase.from('news_articles').delete().eq('id', item.id);
      if (deleteError) throw deleteError;
    } catch (deleteError) {
      console.error('La suppression de l’actualité a échoué.', deleteError);
      setError('Cette actualité n’a pas pu être supprimée.');
      return;
    }
    let imageCleanupFailed = false;
    if (item.imagePath) {
      try {
        const { error: imageError } = await supabase.storage.from('news-images').remove([item.imagePath]);
        if (imageError) throw imageError;
      } catch (imageError) {
        console.error('L’image de l’actualité supprimée n’a pas pu être effacée.', imageError);
        setError('L’actualité est supprimée, mais son image n’a pas pu être effacée.');
        imageCleanupFailed = true;
      }
    }
    await refresh();
    if (!imageCleanupFailed) setNotice('Actualité supprimée.');
  }

  return (
    <div className="admin-content-grid">
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <span className="section-label">RÉDACTION</span>
            <h2>{editing ? 'Modifier une actualité' : 'Nouvelle actualité'}</h2>
          </div>
          {editing && <button className="admin-secondary-button" type="button" onClick={() => { setNotice(''); startEditing(null); }}>Annuler</button>}
        </div>
        {error && <SupabaseError>{error}</SupabaseError>}
        {notice && <p className="admin-success" role="status">{notice}</p>}
        <form className="admin-form" key={formKey} onSubmit={submit}>
          <div className="admin-form__row">
            <label>
              Date de publication
              <input name="date" type="date" defaultValue={formValues(editing).date} required />
            </label>
            <label>
              Catégorie
              <select name="category" defaultValue={formValues(editing).category}>
                {newsCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </label>
          </div>
          <label>
            Titre
            <input name="title" defaultValue={editing?.title ?? ''} maxLength={180} required />
          </label>
          <label>
            Résumé affiché dans les actualités
            <textarea name="excerpt" defaultValue={editing?.excerpt ?? ''} rows={3} maxLength={500} required />
          </label>
          <label>
            Texte complet de l’article
            <textarea name="body" defaultValue={editing?.body ?? editing?.excerpt ?? ''} rows={9} required />
            <small>Un paragraphe par bloc, séparez les paragraphes par une ligne vide.</small>
          </label>
          <div className="admin-form__row">
            <label>
              Photo de couverture
              <input name="image" type="file" accept="image/*" required={!editing} />
              {editing?.imagePath && <small>Une image est déjà associée. Choisissez un fichier uniquement pour la remplacer.</small>}
            </label>
            <label>
              Texte alternatif de la photo
              <input name="imageAlt" defaultValue={editing?.imageAlt ?? editing?.title ?? ''} maxLength={180} />
            </label>
          </div>
          <div className="admin-form__row admin-form__row--controls">
            <label className="admin-checkbox">
              <input name="homeFeatured" type="checkbox" defaultChecked={formValues(editing).homeFeatured} />
              Mettre cette information à la une
            </label>
            <label>
              Position dans le carrousel
              <select name="carouselPosition" defaultValue={formValues(editing).carouselPosition}>
                <option value="">Ne pas afficher</option>
                <option value="1">1 — En premier</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </label>
          </div>
          <div className="admin-form__row">
            <label>
              Statut
              <select name="status" defaultValue={editing?.status ?? 'draft'}>
                <option value="draft">Brouillon</option>
                <option value="published">Publier maintenant</option>
              </select>
            </label>
            <span className="admin-form__hint">La publication actualise automatiquement l’accueil et la page Actualités.</span>
          </div>
          <button className="admin-primary-button" type="submit" disabled={saving}>
            {saving ? 'Enregistrement…' : editing ? 'Enregistrer les modifications' : 'Enregistrer l’actualité'}
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div><span className="section-label">CONTENUS</span><h2>Actualités existantes</h2></div>
          <button className="admin-secondary-button" type="button" onClick={() => void refresh()}>Actualiser</button>
        </div>
        {items.length === 0 ? <p>Aucune actualité enregistrée.</p> : (
          <ul className="admin-item-list">
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <span className={`admin-status admin-status--${item.status}`}>{item.status === 'published' ? 'Publié' : 'Brouillon'}</span>
                  <strong>{item.title}</strong>
                  <small>{item.date} · {item.category}</small>
                </div>
                <div className="admin-item-list__actions">
                  <button className="admin-secondary-button" type="button" onClick={() => { setNotice(''); startEditing(item); }}>Modifier</button>
                  <button className="admin-danger-button" type="button" onClick={() => void remove(item)}>Supprimer</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
