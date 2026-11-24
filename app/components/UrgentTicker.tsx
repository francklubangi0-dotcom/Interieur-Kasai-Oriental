'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  isUrgentNoticeActive,
  urgentNoticeCategories,
} from '../data/urgentNotices';
import { useLiveUrgentNotices } from './useLiveContent';

export default function UrgentTicker() {
  const [now, setNow] = useState<number | null>(null);
  const { items: notices, error } = useLiveUrgentNotices([]);
  const activeNotices = now === null ? [] : notices.filter((notice) => isUrgentNoticeActive(notice, now));
  const message = error
    ? 'La mise à jour des avis urgents est indisponible. Consultez la page des avis.'
    : now === null
    ? 'Vérification des avis urgents en cours.'
    : activeNotices.length === 0
      ? 'Aucun avis urgent en cours. Consultez les communications officielles du Ministère.'
      : activeNotices.map((notice) => {
        const category = urgentNoticeCategories.find((item) => item.value === notice.category)?.label;
        return `${category ? `${category} — ` : ''}${notice.title} — ${notice.zones.join(', ')}`;
      }).join(' • ');

  useEffect(() => {
    const updateTime = () => setNow(Date.now());
    updateTime();
    const intervalId = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  const tickerItems = Array.from({ length: 3 }, (_, index) => (
    <span className="urgent-ticker__item" key={index}>{message}</span>
  ));

  return (
    <aside className="urgent-ticker" aria-label="Avis urgents du Ministère">
      <span className="urgent-ticker__label">
        <span className={`urgent-ticker__indicator ${activeNotices.length > 0 || error ? 'is-active' : ''}`} aria-hidden="true" />
        <strong>AVIS URGENT</strong>
      </span>
      <div className="urgent-ticker__window" aria-hidden="true">
        <div className="urgent-ticker__track">
          <div className="urgent-ticker__group">{tickerItems}</div>
          <div className="urgent-ticker__group" aria-hidden="true">
            {tickerItems.map((item, index) => (
              <span className="urgent-ticker__item" key={`duplicate-${index}`}>{message}</span>
            ))}
          </div>
        </div>
      </div>
      <span className="urgent-ticker__static" aria-hidden="true">{message}</span>
      <span className="sr-only" role="status" aria-live="polite">
        {message}
      </span>
      <Link className="urgent-ticker__link" href="/avis-urgents">
        Voir les avis <span aria-hidden="true">→</span>
      </Link>
    </aside>
  );
}
