import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import UrgentNoticeList from '../components/UrgentNoticeList';
import { getPublishedUrgentNotices } from '../data/urgentNotices';

export default function UrgentNoticesPage() {
  const notices = getPublishedUrgentNotices();

  return (
    <>
      <SiteHeader />
      <main className="urgent-notices-page">
        <div className="page-shell urgent-notices-page__inner">
          <a className="urgent-notices-page__back page-back-link" href="/">← Retour à l’accueil</a>
          <span className="section-label">INFORMATION OFFICIELLE</span>
          <h1>Avis urgents</h1>
          <p className="urgent-notices-page__intro">Retrouvez ici les alertes, consignes et communications nécessitant une attention immédiate.</p>
          <UrgentNoticeList notices={notices} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
