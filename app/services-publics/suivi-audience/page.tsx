import Link from 'next/link';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';
import AudienceRequestTracking from './AudienceRequestTracking';

export default function AudienceTrackingPage() {
  return (
    <>
      <SiteHeader activeItem="SERVICES AU PUBLIC" />
      <main className="audience-page">
        <div className="page-shell audience-page__inner">
          <Link className="page-back-link" href="/services-publics">← Services aux citoyens</Link>
          <header className="audience-page__heading">
            <span className="section-label">SUIVI ADMINISTRATIF</span>
            <h1>Suivre une demande</h1>
            <p>Saisissez le numéro reçu après le dépôt pour consulter uniquement l’état de traitement de votre demande.</p>
          </header>
          <AudienceRequestTracking />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
