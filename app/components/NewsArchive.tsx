'use client';

import Image from 'next/image';
import Link from 'next/link';
import minImage from '../../images/MIN.jpeg';
import governorImage from '../../images/GOUV1.jpeg';
import consultationImage from '../../images/GOUV.jpeg';
import { formatNewsDate, type NewsItem } from '../data/news';
import { useLiveNews } from './useLiveContent';

const storyImages: Record<string, typeof minImage> = {
  '20-10-2026': minImage,
  '25-10-2026': governorImage,
  '07-10-2026': consultationImage,
  '06-10-2026': consultationImage,
};

function articleHref(item: NewsItem) {
  return `/actualites/article/?slug=${encodeURIComponent(item.slug ?? item.id)}`;
}

export default function NewsArchive({ initialItems }: { initialItems: NewsItem[] }) {
  const { items, error } = useLiveNews(initialItems);

  return (
    <>
      {error && <p className="cms-load-error page-shell" role="alert">{error}</p>}
      <div className="actualites-list page-shell">
        {items.length === 0 ? (
          <p className="actualites-empty">Aucune actualité publiée pour le moment.</p>
        ) : items.map((item) => {
          const image = item.imageUrl
            ?? storyImages[item.slug ?? item.id]
            ?? minImage;

          return (
            <article className="actualite-card" id={`article-${item.slug ?? item.id}`} key={item.id}>
              <Link className="actualite-card__image" href={articleHref(item)} aria-label={`Lire : ${item.title}`}>
                <Image src={image} alt={item.imageAlt || item.title} fill sizes="(max-width: 760px) 100vw, 40vw" />
              </Link>
              <div className="actualite-card__content">
                <div className="actualite-card__meta">
                  <time dateTime={item.date}>{formatNewsDate(item.date)}</time>
                  <span>{item.category}</span>
                </div>
                <h2><Link href={articleHref(item)}>{item.title}</Link></h2>
                <p>{item.excerpt}</p>
                <Link className="actualite-card__read-more" href={articleHref(item)}>Lire l’article complet →</Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
