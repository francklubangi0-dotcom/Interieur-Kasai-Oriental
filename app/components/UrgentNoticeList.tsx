'use client';

import { useEffect, useState } from 'react';
import {
  formatUrgentNoticeDate,
  getOfficialDateString,
  isUrgentNoticeActive,
  urgentNoticeCategories,
  type UrgentNotice,
} from '../data/urgentNotices';
import { useLiveUrgentNotices } from './useLiveContent';

export default function UrgentNoticeList({ notices }: { notices: UrgentNotice[] }) {
  const [now, setNow] = useState<number | null>(null);
  const { items, error } = useLiveUrgentNotices(notices);

  useEffect(() => {
    const updateTime = () => setNow(Date.now());
    updateTime();
    const intervalId = window.setInterval(updateTime, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  if (items.length === 0) {
    return (
      <>
        {error && <p className="cms-load-error" role="alert">{error}</p>}
        <section className="urgent-notices-empty" role="status">
          <span className="urgent-notices-empty__icon" aria-hidden="true">✓</span>
          <div>
            <span className="urgent-notices-empty__label">Situation actuelle</span>
            <h2>Aucun avis urgent en cours.</h2>
            <p>Aucune alerte officielle n’est actuellement publiée. Cette page sera mise à jour dès qu’une consigne urgente devra être portée à votre attention.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {error && <p className="cms-load-error" role="alert">{error}</p>}
      <div className="urgent-notices-list">
      {items.map((notice) => {
        const active = now !== null && isUrgentNoticeActive(notice, now);
        const scheduled = now !== null && notice.date > getOfficialDateString(new Date(now));
        const categoryLabel = urgentNoticeCategories.find((category) => category.value === notice.category)?.label;

        return (
          <article className={`urgent-notice-item ${active ? 'is-active' : scheduled ? 'is-scheduled' : 'is-expired'}`} id={`avis-${notice.id}`} key={notice.id}>
            <div className="urgent-notice-item__topline">
              <span className="urgent-notice-item__issuer">{notice.authority}</span>
              <span className="urgent-notice-item__status">
                <span aria-hidden="true" />
                {now === null ? 'Vérification…' : active ? 'Avis en cours' : scheduled ? 'Avis programmé' : 'Avis expiré'}
              </span>
            </div>
            {categoryLabel && <span className="urgent-notice-item__category">{categoryLabel}</span>}
            <h2>{notice.title}</h2>
            <dl className="urgent-notice-item__details">
              <div>
                <dt>Date de publication</dt>
                <dd><time dateTime={notice.date}>{formatUrgentNoticeDate(notice.date)}</time></dd>
              </div>
              <div>
                <dt>Zone concernée</dt>
                <dd>{notice.zones.join(', ')}</dd>
              </div>
              <div className="urgent-notice-item__instructions">
                <dt>Consignes</dt>
                <dd>
                  <ul>
                    {notice.instructions.map((instruction) => <li key={instruction}>{instruction}</li>)}
                  </ul>
                </dd>
              </div>
              <div>
                <dt>Date d’expiration</dt>
                <dd><time dateTime={notice.expiresAt}>{formatUrgentNoticeDate(notice.expiresAt)}</time></dd>
              </div>
            </dl>
          </article>
        );
      })}
      </div>
    </>
  );
}
