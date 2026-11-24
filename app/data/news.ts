export const newsCategories = ['ACTUALITÉ', 'COMMUNIQUÉ', 'INSTITUTION'] as const;

export type NewsCategory = (typeof newsCategories)[number];

export type NewsItem = {
  id: string;
  slug?: string;
  date: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  body?: string;
  imagePath?: string | null;
  imageUrl?: string | null;
  imageAlt?: string;
  homeFeatured: boolean;
  carouselPosition: number | null;
  status: 'draft' | 'published';
};

export const newsItems: NewsItem[] = [
  {
    id: '25-10-2026',
    date: '2026-10-25',
    category: 'INSTITUTION',
    title: 'LE GOUVERNEUR ÉCHANGE AVEC DES CHEFS COUTUMIERS DE BAKWA KALONJI',
    excerpt: 'Une consultation et une identification des conflits coutumiers sont menées avec les chefs coutumiers de Bakwa Kalonji.',
    homeFeatured: false,
    carouselPosition: 3,
    status: 'published',
  },
  {
    id: '20-10-2026',
    date: '2026-10-20',
    category: 'ACTUALITÉ',
    title: "Le ministre provincial de l’Intérieur assure l’intérim du gouverneur",
    excerpt: "En l'absence du gouverneur et du vice-gouverneur, Me Patrick Mukendi Makanda est appelé à assurer l'intérim à la tête de la province du Kasaï Oriental.",
    homeFeatured: true,
    carouselPosition: 1,
    status: 'published',
  },
  {
    id: '07-10-2026',
    date: '2026-10-07',
    category: 'ACTUALITÉ',
    title: 'Consultations et identification des conflits coutumiers dans la chefferie de Bakwa Kalonji',
    excerpt: 'La séance est présidée par le gouverneur de province.',
    homeFeatured: false,
    carouselPosition: 2,
    status: 'published',
  },
  {
    id: '06-10-2026',
    date: '2026-10-06',
    category: 'COMMUNIQUÉ',
    title: 'CONSULTATION DES CHEFS COUTUMIERS DES GROUPEMENTS DU TERRITOIRE DE KABEYA KAMUANGA',
    excerpt: 'Cette rencontre se tiendra dans la salle des réunions du Gouvernorat de Province, à Mbujimayi, à partir de 09 h précises.',
    homeFeatured: false,
    carouselPosition: null,
    status: 'published',
  },
];

export function getPublishedNews() {
  return newsItems
    .filter((item) => item.status === 'published')
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function getLatestNews(count: number) {
  return getPublishedNews()
    .filter((item): item is NewsItem & { carouselPosition: number } => item.carouselPosition !== null)
    .sort((left, right) => left.carouselPosition - right.carouselPosition)
    .slice(0, count);
}

export function getHomeNews() {
  const publishedItems = getPublishedNews();
  const featured = publishedItems.find((item) => item.homeFeatured);

  if (!featured) {
    throw new Error('Aucune actualité principale de l’accueil n’est configurée.');
  }

  const items = publishedItems.filter((item) => item.id !== featured.id);
  return { featured, items: items.slice(0, 3) };
}

export function formatNewsDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
