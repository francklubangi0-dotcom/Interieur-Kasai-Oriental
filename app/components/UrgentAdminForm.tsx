'use client';

import { useEffect, useState } from 'react';
import {
  getOfficialDateString,
  urgentNoticeCategories,
  type UrgentNotice,
  type UrgentNoticeCategory,
} from '../data/urgentNotices';
import {
  getSupabaseClient,
  loadAdminUrgentNotices,
  subscribeToCmsTable,
  type UrgentNoticeRow,
} from '../data/supabase';

type NoticeFormValues = {
  category: UrgentNoticeCategory;
  authority: string;
  date: string;
  zones: string;
  title: string;
  instructions: string;
  expiresAt: string;
  status: 'draft' | 'published';
};

function formValues(notice: UrgentNotice | null): NoticeFormValues {
  if (!notice) {
    const today = getOfficialDateString();
    return {
      category: 'security-alert',
      authority: 'Ministère de l’Intérieur du Kasaï-Oriental',
      date: today,
      zones: '',
      title: '',
      instructions: '',
      expiresAt: today,
      status: 'draft',
    };
  }
  return {
    category: notice.category ?? 'security-alert',
    authority: notice.authority,
    date: notice.date,
    zones: notice.zones.join('\n'),
    title: notice.title,
    instructions: notice.instructions.join('\n'),
    expiresAt: notice.expiresAt,
    status: notice.status,
  };
}

function isNoticeCategory(value: string): value is UrgentNoticeCategory {
  return urgentNoticeCategories.some((category) => category.value === value);
}

export default function UrgentAdminForm() {
  const supabase = getSupabaseClient();
  const [items, setItems] = useState<UrgentNotice[]>([]);
  const [editing, setEditing] = useState<UrgentNotice | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [saving, setSaving] = useState(false);

  async function refresh() {
    try {
      const currentItems = await loadAdminUrgentNotices();
      if (currentItems === null) {
        setError('La connexion à Supabase n’est pas configurée.');
        return;
      }
      setItems(currentItems);
      setError('');
    } catch (loadError) {
      console.error('Le chargement des avis urgents administrateur a échoué.', loadError);
      setError('Impossible de charger les avis. Vérifiez la migration Supabase et les droits administrateur.');
    }
  }

  useEffect(() => {
    void refresh();
    return subscribeToCmsTable('urgent_notices', () => void refresh());
  }, []);

  function startEditing(item: UrgentNotice | null) {
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
    const categoryValue = String(formData.get('category') ?? '');
    const authority = String(formData.get('authority') ?? '').trim();
    const date = String(formData.get('date') ?? '');
    const zones = String(formData.get('zones') ?? '').split(/\r?\n/).map((zone) => zone.trim()).filter(Boolean);
    const title = String(formData.get('title') ?? '').trim();
    const instructions = String(formData.get('instructions') ?? '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const expiresAt = String(formData.get('expiresAt') ?? '');
    const statusValue = String(formData.get('status') ?? 'draft');

    if (!isNoticeCategory(categoryValue)) {
      setError('Choisissez une catégorie valide.');
      setSaving(false);
      return;
    }
    if (expiresAt < date) {
      setError('La date d’expiration doit être égale ou postérieure à la date de publication.');
      setSaving(false);
      return;
    }
    if (zones.length === 0 || instructions.length === 0) {
      setError('Indiquez au moins une zone concernée et une consigne.');
      setSaving(false);
      return;
    }
    if (statusValue !== 'draft' && statusValue !== 'published') {
      setError('Choisissez un statut valide.');
      setSaving(false);
      return;
    }

    const row: Omit<UrgentNoticeRow, 'id' | 'created_at' | 'updated_at'> = {
      category: categoryValue,
      authority,
      published_at: date,
      zones,
      title,
      instructions,
      expires_at: expiresAt,
      status: statusValue,
    };

    try {
      const result = editing
        ? await supabase.from('urgent_notices').update(row).eq('id', editing.id)
        : await supabase.from('urgent_notices').insert(row);
      if (result.error) throw result.error;
      setNotice(statusValue === 'published'
        ? 'Avis publié. Le bandeau sera actualisé pour les visiteurs.'
        : 'Brouillon enregistré.');
      startEditing(null);
      await refresh();
    } catch (saveError) {
      console.error('L’enregistrement de l’avis urgent a échoué.', saveError);
      setError('L’avis n’a pas pu être enregistré. Vérifiez les champs et la configuration Supabase.');
    } finally {
      setSaving(false);
    }
  }

  async function remove(item: UrgentNotice) {
    if (!supabase || !window.confirm(`Supprimer « ${item.title} » ?`)) return;
    setError('');
    setNotice('');
    try {
      const { error: deleteError } = await supabase.from('urgent_notices').delete().eq('id', item.id);
      if (deleteError) throw deleteError;
    } catch (deleteError) {
      console.error('La suppression de l’avis urgent a échoué.', deleteError);
      setError('Cet avis n’a pas pu être supprimé.');
      return;
    }
    await refresh();
    setNotice('Avis supprimé.');
  }

  const values = formValues(editing);

  return (
    <div className="admin-content-grid">
      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div>
            <span className="section-label">AVIS OFFICIEL</span>
            <h2>{editing ? 'Modifier un avis' : 'Nouvel avis urgent'}</h2>
          </div>
          {editing && <button className="admin-secondary-button" type="button" onClick={() => { setNotice(''); startEditing(null); }}>Annuler</button>}
        </div>
        {error && <p className="admin-error" role="alert">{error}</p>}
        {notice && <p className="admin-success" role="status">{notice}</p>}
        <form className="admin-form" key={formKey} onSubmit={submit}>
          <label>
            Catégorie — affichée sous forme de bandeau rouge
            <select name="category" defaultValue={values.category}>
              {urgentNoticeCategories.map((category) => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </label>
          <label>
            Autorité émettrice
            <input name="authority" defaultValue={values.authority} maxLength={140} required />
          </label>
          <div className="admin-form__row">
            <label>
              Date de publication
              <input name="date" type="date" defaultValue={values.date} required />
            </label>
            <label>
              Date d’expiration
              <input name="expiresAt" type="date" defaultValue={values.expiresAt} required />
            </label>
          </div>
          <label>
            Zone(s) concernée(s)
            <textarea name="zones" defaultValue={values.zones} rows={3} required />
            <small>Une zone par ligne.</small>
          </label>
          <label>
            Titre de l’avis
            <input name="title" defaultValue={values.title} maxLength={180} required />
          </label>
          <label>
            Consignes à communiquer
            <textarea name="instructions" defaultValue={values.instructions} rows={5} required />
            <small>Une consigne par ligne. Elles apparaîtront dans le détail de l’avis.</small>
          </label>
          <label>
            Statut
            <select name="status" defaultValue={values.status}>
              <option value="draft">Brouillon</option>
              <option value="published">Publier maintenant</option>
            </select>
          </label>
          <button className="admin-primary-button" type="submit" disabled={saving}>
            {saving ? 'Enregistrement…' : editing ? 'Enregistrer les modifications' : 'Enregistrer l’avis'}
          </button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-panel__heading">
          <div><span className="section-label">CONTENUS</span><h2>Avis existants</h2></div>
          <button className="admin-secondary-button" type="button" onClick={() => void refresh()}>Actualiser</button>
        </div>
        {items.length === 0 ? <p>Aucun avis enregistré.</p> : (
          <ul className="admin-item-list">
            {items.map((item) => {
              const label = urgentNoticeCategories.find((category) => category.value === item.category)?.label;
              return (
                <li key={item.id}>
                  <div>
                    <span className={`admin-status admin-status--${item.status}`}>{item.status === 'published' ? 'Publié' : 'Brouillon'}</span>
                    <strong>{item.title}</strong>
                    <small>{label} · {item.date} — expiration {item.expiresAt}</small>
                  </div>
                  <div className="admin-item-list__actions">
                    <button className="admin-secondary-button" type="button" onClick={() => { setNotice(''); startEditing(item); }}>Modifier</button>
                    <button className="admin-danger-button" type="button" onClick={() => void remove(item)}>Supprimer</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
