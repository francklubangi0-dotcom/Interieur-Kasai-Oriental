'use client';

import Image from 'next/image';
import Link from 'next/link';
import governorImage from '../../images/GOUV1.jpeg';
import consultationImage from '../../images/GOUV.jpeg';
import ministerImage from '../../images/MIN.jpeg';
import { formatNewsDate, type NewsItem } from '../data/news';
import { useLiveNews } from './useLiveContent';

const storyImages: Record<string, typeof ministerImage> = {
  '20-10-2026': ministerImage,
  '25-10-2026': governorImage,
  '07-10-2026': consultationImage,
  '06-10-2026': consultationImage,
};

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

function articleHref(item: NewsItem) {
  return `/actualites/article/?slug=${encodeURIComponent(item.slug ?? item.id)}`;
}

export default function HomeNewsSection({ initialItems }: { initialItems: NewsItem[] }) {
  const { items, error, loaded } = useLiveNews(initialItems);
  const featured = loaded
    ? items.find((item) => item.homeFeatured) ?? items[0] ?? null
    : initialItems.find((item) => item.homeFeatured) ?? initialItems[0] ?? null;
  const otherNews = items
    .filter((item) => item.id !== featured?.id)
    .slice(0, 3);

  if (!featured) {
    return (
      <section id="actualites" className="news-section">
        <div className="news-section__inner page-shell">
          <div className="section-topline">
            <div><span className="section-label">À LA UNE</span><h2>Les dernières <strong>actualités.</strong></h2></div>
            <Link className="underlined-link" href="/actualites">Voir toutes les actualités <Arrow /></Link>
          </div>
          <p>Aucune actualité n’est actuellement publiée.</p>
          {error && <p className="cms-load-error" role="alert">{error}</p>}
        </div>
      </section>
    );
  }

  const image = featured.imageUrl
    ?? storyImages[featured.slug ?? featured.id]
    ?? ministerImage;

  return (
    <section id="actualites" className="news-section">
      <div className="news-section__inner page-shell">
        <div className="section-topline">
          <div><span className="section-label">À LA UNE</span><h2>Les dernières <strong>actualités.</strong></h2></div>
          <Link className="underlined-link" href="/actualites">Voir toutes les actualités <Arrow /></Link>
        </div>
        {error && <p className="cms-load-error" role="alert">{error}</p>}
        <div className="news-layout">
          <article className="featured-news" id={`actualite-${featured.slug ?? featured.id}`}>
            <div className="featured-news__image">
              <Image src={image} alt={featured.imageAlt || featured.title} className="featured-news__photo" />
            </div>
            <div className="featured-news__body">
              <span className="news-meta">{formatNewsDate(featured.date)} · {featured.category}</span>
              <h3>{featured.title}</h3>
              <p>{featured.excerpt}</p>
              <Link className="underlined-link" href={articleHref(featured)}>Lire l’article <Arrow /></Link>
            </div>
          </article>
          <div className="news-list">
            {otherNews.map((item) => (
              <article className="news-row" id={`actualite-${item.slug ?? item.id}`} key={item.id}>
                <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
                <div>
                  <span className="news-meta">{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                  <Link href={articleHref(item)}>Lire l’article <Arrow /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
