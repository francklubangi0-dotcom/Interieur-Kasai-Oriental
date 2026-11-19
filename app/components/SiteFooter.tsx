import Image from 'next/image';
import logo from '../../images/RIJEC DESIGN (11).png';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="reference-footer">
      <div className="page-shell footer-main">
        <div className="footer-identity">
          <a className="reference-logo reference-logo--footer" href="/#accueil" aria-label="Ministère de l’Intérieur du Kasaï-Oriental, accueil">
            <Image src={logo} alt="Ministère de l’Intérieur du Kasaï-Oriental" />
          </a>
          <p>Site officiel du Ministère de l&apos;Intérieur, Sécurité, Décentralisation, Affaires Coutimières, Relations avec le Parlement, Coopérations Interprovinciales et PTNTIC de la Province du Kasaï-Oriental en République démocratique du Congo.</p>
          <address>Ancien gouvernorat, sise 001, Avenue Kasengulu,<br />Quartier Bubanji, Commune de Diulu Mbujimayi,<br />République démocratique du Congo</address>
          <a className="footer-email" href="mailto:info@interieur-kasaioriental.gouv.cd">info@interieur-kasaioriental.gouv.cd</a>
        </div>
        <div className="footer-column">
          <h3>Liens utiles</h3>
          <a href="/#accueil">Accueil</a>
          <a href="/#ministere">À propos</a>
          <a href="/#programmes">Services</a>
          <a href="/#actualites">Actualités</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="footer-column">
          <h3>Liens institutionnels</h3>
          <a href="https://kasaioriental.gouv.cd/?fbclid=IwRlRTSAVr5mxleHRuA2FlbQIxMABwZG9mBWZkaWQWUSh1TtSTPV99LYZKkmt6Av9AR7hn4HNydGMGYXBwX2lkCjY2Mjg1NjgzNzkAAR-iv0TyFpsm_-swHyZvq8uzEabltSSKf1IBLjfEkSWE-vNRe12woRCs1gSWdg_aem_l8-pmoheOMurSCxkwugAew" target="_blank" rel="noopener noreferrer">Gouvernorat du Kasaï Oriental</a>
          <a href="/#contact">Assemblée provinciale du Kasaï Oriental</a>
          <h3 className="footer-social-title">Réseaux sociaux</h3>
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
        <span>© {year} Tous droits réservés Ministère de l&apos;Intérieur Kasaï-Oriental</span>
      </div>
    </footer>
  );
}
