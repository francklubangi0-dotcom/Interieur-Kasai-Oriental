import Image from 'next/image';
import logo from '../../images/rijec-logo-footer.png';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="reference-footer">
      <div className="footer-accent" aria-hidden="true" />
      <div className="page-shell footer-main">
        <div className="footer-identity">
          <a className="reference-logo reference-logo--footer" href="/" data-reset-scroll aria-label="Ministère de l’Intérieur du Kasaï-Oriental, accueil">
            <Image src={logo} alt="Ministère de l’Intérieur du Kasaï-Oriental" />
          </a>
          <span className="footer-overline">Portail officiel</span>
          <p>Ministère provincial de l&apos;Intérieur, Sécurité, Décentralisation, Affaires coutumières, Relations avec le Parlement, Coopérations interprovinciales et PTNTIC du Kasaï-Oriental.</p>
          <address className="footer-contact-item">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.1 7-13a7 7 0 1 0-14 0c0 6.9 7 13 7 13Z" /><circle cx="12" cy="9" r="2.5" /></svg>
            <span>Ancien gouvernorat, 001, avenue Kasengulu,<br />quartier Bubanji, commune de Diulu, Mbujimayi,<br />République démocratique du Congo</span>
          </address>
          <a className="footer-email footer-contact-item" href="mailto:info@interieur-kasaioriental.gouv.cd">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m4 7 8 6 8-6" /></svg>
            <span>info@interieur-kasaioriental.gouv.cd</span>
          </a>
        </div>
        <nav className="footer-column" aria-label="Liens utiles">
          <h3>Explorer le site</h3>
          <a href="/" data-reset-scroll>Accueil</a>
          <a href="/#ministere">Le Ministère</a>
          <a href="/missions">Nos missions</a>
          <a href="/#actualites">Actualités</a>
          <a href="/avis-urgents">Avis urgents</a>
          <a href="/contact">Contact</a>
        </nav>
        <div className="footer-column">
          <h3>Institutions &amp; réseaux</h3>
          <a href="https://kasaioriental.gouv.cd/" target="_blank" rel="noopener noreferrer">Gouvernorat du Kasaï Oriental <span aria-hidden="true">↗</span></a>
          <h3 className="footer-social-title">Suivez le Ministère</h3>
          <a className="footer-social-link" href="https://web.facebook.com/profile.php?id=100069779207602" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8.4V6.8c0-.8.5-1 1-1h2V2h-2.8C10.7 2 10 4.6 10 6.5v1.9H7V12h3v10h4V12h3l.5-3.6H14Z" /></svg>
            <span>Facebook</span>
          </a>
          <a className="footer-social-link" href="https://x.com/patrickmakanda0?s=11" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.7 2H22l-7.2 8.2L23.4 22h-6.7l-5.2-6.8L5.5 22H2.2l7.7-8.8L.9 2h6.8l4.7 6.2L18.7 2Zm-1.2 18h1.8L6.8 3.9H4.9L17.5 20Z" /></svg>
            <span>X (Twitter)</span>
          </a>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <span>© {year} Ministère de l&apos;Intérieur du Kasaï-Oriental. Tous droits réservés.</span>
      </div>
    </footer>
  );
}
