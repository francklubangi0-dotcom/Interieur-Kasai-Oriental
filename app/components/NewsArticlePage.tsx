'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import minImage from '../../images/MIN.jpeg';
import governorImage from '../../images/GOUV1.jpeg';
import consultationImage from '../../images/GOUV.jpeg';
import { formatNewsDate, type NewsItem } from '../data/news';
import { getSupabaseClient, loadNewsBySlug, subscribeToCmsTable } from '../data/supabase';

const storyImages: Record<string, typeof minImage> = {
  '20-10-2026': minImage,
  '25-10-2026': governorImage,
  '07-10-2026': consultationImage,
  '06-10-2026': consultationImage,
};

export default function NewsArticlePage({ initialItems, initialSlug }: { initialItems: NewsItem[]; initialSlug?: string }) {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const requestedSlug = initialSlug ?? new URLSearchParams(window.location.search).get('slug') ?? '';
    const hasCmsClient = getSupabaseClient() !== null;

    const refresh = async () => {
      try {
        const latest = requestedSlug ? await loadNewsBySlug(requestedSlug) : null;
        if (!active) return;
        const fallback = hasCmsClient
          ? null
          : initialItems.find((item) => (item.slug ?? item.id) === requestedSlug) ?? null;
        setArticle(latest ?? fallback);
        setError(null);
      } catch (loadError) {
        console.error('Impossible de charger cette actualité.', loadError);
        if (!active) return;
        setArticle(initialItems.find((item) => (item.slug ?? item.id) === requestedSlug) ?? null);
        setError('La mise à jour de cette actualité a échoué. Les informations disponibles sont affichées.');
      } finally {
        if (active) setLoading(false);
      }
    };

    void refresh();
    const unsubscribe = subscribeToCmsTable('news_articles', () => void refresh());

    return () => {
      active = false;
      unsubscribe();
    };
  }, [initialItems, initialSlug]);

  const image = article?.imageUrl
    ?? (article ? storyImages[article.slug ?? article.id] : undefined)
    ?? minImage;

  return (
    <main className="news-article-page">
      <div className="page-shell news-article-page__inner">
        <Link className="news-article-page__back page-back-link" href="/actualites">← Toutes les actualités</Link>
        {error && <p className="cms-load-error" role="alert">{error}</p>}
        {loading ? (
          <p role="status">Chargement de l’actualité…</p>
        ) : !article ? (
          <section className="news-article-not-found" role="status">
            <span className="section-label">INFORMATION OFFICIELLE</span>
            <h1>Cette actualité n’est pas disponible.</h1>
            <p>Elle a peut-être été retirée ou son lien est incomplet.</p>
          </section>
        ) : (
          <article className="news-article">
            <header className="news-article__header">
              <div className="actualite-card__meta">
                <time dateTime={article.date}>{formatNewsDate(article.date)}</time>
                <span>{article.category}</span>
              </div>
              <h1>{article.title}</h1>
              <p className="news-article__excerpt">{article.excerpt}</p>
            </header>
            <div className="news-article__image">
              <Image src={image} alt={article.imageAlt || article.title} fill sizes="(max-width: 760px) 100vw, 1100px" priority />
            </div>
            <div className="news-article__body">
              {(article.body || article.excerpt).split(/\r?\n\s*\r?\n/).map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 20)}`}>{paragraph}</p>
              ))}
            </div>
          </article>
        )}
      </div>
    </main>
  );
}
