import Link from 'next/link';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';
import AudienceRequestForm from './AudienceRequestForm';

export default function RequestAudiencePage() {
  return (
    <>
      <SiteHeader activeItem="SERVICES AU PUBLIC" />
      <main className="audience-page">
        <div className="page-shell audience-page__inner">
          <Link className="page-back-link" href="/services-publics">← Services aux citoyens</Link>
          <header className="audience-page__heading">
            <span className="section-label">DÉMARCHES ET SERVICES AUX CITOYENS</span>
            <h1>Demander une audience</h1>
            <p>
              Décrivez l’objet de votre demande et fournissez un moyen de contact.
              Un numéro de suivi vous sera communiqué après l’envoi.
            </p>
          </header>
          <AudienceRequestForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
