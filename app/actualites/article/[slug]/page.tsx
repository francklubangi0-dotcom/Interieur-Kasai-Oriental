import type { Metadata } from 'next';
import SiteFooter from '../../../components/SiteFooter';
import SiteHeader from '../../../components/SiteHeader';
import NewsArticlePage from '../../../components/NewsArticlePage';
import { getPublishedNews } from '../../../data/news';

export const metadata: Metadata = {
  title: 'Article — Actualités du Ministère de l’Intérieur',
  description: 'Information détaillée du Ministère de l’Intérieur du Kasaï-Oriental.',
};

export function generateStaticParams() {
  return getPublishedNews().map((item) => ({ slug: item.slug ?? item.id }));
}

export default async function NewsArticleSlugRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <SiteHeader activeItem="ACTUALITÉS" />
      <NewsArticlePage initialItems={getPublishedNews()} initialSlug={slug} />
      <SiteFooter />
    </>
  );
}
