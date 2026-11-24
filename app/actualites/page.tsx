import type { Metadata } from 'next';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import NewsArchive from '../components/NewsArchive';
import { getPublishedNews } from '../data/news';

export const metadata: Metadata = {
  title: 'Actualités — Ministère de l’Intérieur du Kasaï-Oriental',
  description: 'Actualités et communiqués officiels du Ministère de l’Intérieur du Kasaï-Oriental.',
};

export default function ActualitesPage() {
  const items = getPublishedNews();

  return (
    <>
      <SiteHeader activeItem="ACTUALITÉS" showUrgentTicker />
      <main className="actualites-page">
        <header className="actualites-heading page-shell">
          <span className="section-label">INFORMATIONS OFFICIELLES</span>
          <h1>Actualités et communiqués</h1>
          <p>Les dernières informations du Ministère de l’Intérieur du Kasaï-Oriental.</p>
        </header>
        <NewsArchive initialItems={items} />
      </main>
      <SiteFooter />
    </>
  );
}
