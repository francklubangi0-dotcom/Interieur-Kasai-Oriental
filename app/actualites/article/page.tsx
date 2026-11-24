import type { Metadata } from 'next';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';
import NewsArticlePage from '../../components/NewsArticlePage';
import { getPublishedNews } from '../../data/news';

export const metadata: Metadata = {
  title: 'Article — Actualités du Ministère de l’Intérieur',
  description: 'Information détaillée du Ministère de l’Intérieur du Kasaï-Oriental.',
};

export default function NewsArticleRoute() {
  return (
    <>
      <SiteHeader activeItem="ACTUALITÉS" />
      <NewsArticlePage initialItems={getPublishedNews()} />
      <SiteFooter />
    </>
  );
}
