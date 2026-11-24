export const urgentNoticeCategories = [
  { value: 'security-alert', label: 'Alerte sécuritaire' },
  { value: 'temporary-access-restriction', label: 'Restriction temporaire d’accès' },
  { value: 'calm-appeal', label: 'Appel au calme' },
  { value: 'rumor-warning', label: 'Mise en garde contre une rumeur' },
  { value: 'accident-disaster', label: 'Accident ou catastrophe' },
  { value: 'service-closure', label: 'Fermeture temporaire d’un service' },
  { value: 'digital-service-interruption', label: 'Interruption d’un service numérique' },
  { value: 'road-danger', label: 'Danger routier' },
  { value: 'witness-appeal', label: 'Appel à témoins' },
  { value: 'administrative-measure', label: 'Rappel d’une mesure administrative' },
] as const;

export type UrgentNoticeCategory = (typeof urgentNoticeCategories)[number]['value'];

export type UrgentNotice = {
  id: string;
  category?: UrgentNoticeCategory;
  authority: string;
  date: string;
  zones: string[];
  title: string;
  instructions: string[];
  expiresAt: string;
  status: 'draft' | 'published';
};

export const urgentNotices: UrgentNotice[] = [];

export function getPublishedUrgentNotices() {
  return urgentNotices
    .filter((notice) => notice.status === 'published')
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function isUrgentNoticeActive(notice: UrgentNotice, now = Date.now()) {
  const currentDate = getOfficialDateString(new Date(now));
  return notice.status === 'published'
    && notice.date <= currentDate
    && currentDate <= notice.expiresAt;
}

export function getOfficialDateString(now = new Date()) {
  const dateParts = new Intl.DateTimeFormat('en-CA', {
    day: '2-digit',
    month: '2-digit',
    timeZone: 'Africa/Lubumbashi',
    year: 'numeric',
  }).formatToParts(now);
  return `${dateParts.find((part) => part.type === 'year')?.value}-${dateParts.find((part) => part.type === 'month')?.value}-${dateParts.find((part) => part.type === 'day')?.value}`;
}

export function getActiveUrgentNotices(now = Date.now()) {
  return getPublishedUrgentNotices().filter((notice) => isUrgentNoticeActive(notice, now));
}

export function formatUrgentNoticeDate(date: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
}
