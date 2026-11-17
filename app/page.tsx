'use client';

import { useEffect, useState } from 'react';

const menuItems = [
  ['ACCUEIL', '#accueil'],
  ['LE MINISTÈRE', '#ministere'],
  ['PROGRAMME', '#programmes'],
  ['CSU', '#csu'],
  ['ACTUALITÉS', '#actualites'],
  ['MAGAZINE', '#magazine'],
  ['DOCUMENTS', '#documents'],
  ['ACCORD', '#accord'],
  ['ÉPIDÉMIOLOGIE', '#epidemio'],
];

const institutions = [
  ['INSP', 'Institut National de la Santé Publique', 'Structure scientifique et technique de référence.', 'blue'],
  ['FPS', 'Fonds de Promotion de la Santé', 'Mécanisme de financement pour la santé.', 'green'],
  ['FSS', 'Fonds de Solidarité de Santé', 'Un dispositif financier solidaire.', 'yellow'],
  ['ARC-CSU', 'Autorité de Régulation de la CSU', 'Réguler et contrôler la couverture santé.', 'red'],
  ['ANICNS', 'Agence Nationale de l’Ingénierie Clinique', 'Innovation et information de santé.', 'orange'],
  ['ANAMED', 'Agence Nationale des Médicaments', 'Qualité et disponibilité des produits.', 'purple'],
];

const news = [
  ['16/10/2026', 'ACTUALITÉ', 'Un seul plan, un seul budget, une seule coordination', 'Dans la riposte contre la 17ᵉ épidémie, l’organisation collective reste la première force.'],
  ['07/10/2026', 'ACTUALITÉ', 'Renforcer la riposte dans les provinces affectées', 'Les équipes poursuivent la coordination et la sensibilisation au plus près des communautés.'],
  ['06/10/2026', 'COMMUNIQUÉ', 'Consultation sur la mise en œuvre de l’assurance maladie', 'Les travaux d’information et de consultation se poursuivent avec les parties prenantes.'],
  ['29/09/2026', 'INSTITUTION', 'Le ministre échange avec les acteurs de terrain', 'Un dialogue régulier pour faire remonter les besoins et accélérer les réponses.'],
];

const agenda = [
  ['08 SEPTEMBRE 2027', 'Journée mondiale de la physiothérapie'],
  ['10 SEPTEMBRE 2027', 'Journée mondiale de prévention du suicide'],
  ['12 SEPTEMBRE 2027', 'Journée mondiale des premiers secours'],
  ['21 SEPTEMBRE 2027', 'Journée mondiale de la maladie d’Alzheimer'],
];

function Arrow() { return <span aria-hidden="true">→</span>; }
function Chevron() { return <span className="chevron" aria-hidden="true">⌄</span>; }

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState('2026');

  useEffect(() => setYear(String(new Date().getFullYear())), []);

  return (
    <>
      <header className="reference-header">
        <div className="header-shell">
          <a className="reference-logo" href="#accueil" aria-label="nod.jc, accueil"><span className="logo-symbol">N</span><span className="logo-copy"><strong>nod</strong><em>.jc</em><small>Portail institutionnel</small></span></a>
          <button className="reference-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="reference-nav"><span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span><i /><i /><i /></button>
          <nav id="reference-nav" className={`reference-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Menu principal">
            {menuItems.map(([label, href], index) => <a key={label} className={index === 0 ? 'active' : ''} href={href} onClick={() => setMenuOpen(false)}>{label}{['LE MINISTÈRE', 'DOCUMENTS'].includes(label) && <Chevron />}</a>)}
          </nav>
          <a className="language-switch" href="#contact">FR <Chevron /></a>
        </div>
      </header>

      <main>
        <section id="accueil" className="reference-hero">
          <div className="hero-background" />
          <div className="hero-overlay" />
          <div className="hero-shell">
            <div className="hero-copy"><span className="hero-kicker">ACTUALITÉ / 16 OCTOBRE 2026</span><h1>Un seul plan,<br />un seul budget,<br /><strong>une seule coordination</strong></h1><p>Pour une action publique plus proche, plus lisible et plus efficace, nous faisons circuler l’information et les solutions au plus près des communautés.</p><a className="reference-button" href="#actualites">En savoir plus <Arrow /></a></div>
            <button className="hero-arrow hero-arrow--left" aria-label="Slide précédent">‹</button><button className="hero-arrow hero-arrow--right" aria-label="Slide suivant">›</button>
            <div className="hero-dots" aria-label="Navigation du diaporama"><span className="active" /><span /><span /><span /></div>
          </div>
          <a className="event-card" href="#agenda"><span>ÉVÉNEMENT / 8 SEPTEMBRE 2027</span><strong>Journée mondiale de la physiothérapie</strong><Arrow /></a>
        </section>

        <section className="minister-message page-shell" aria-labelledby="minister-message-title">
          <div className="minister-message__copy">
            <span className="section-label">LE MOT DU MINISTRE</span>
            <h2 id="minister-message-title">DR.<br /><strong>SAMUEL ROGER KAMBA</strong></h2>
            <p className="minister-message__role">Ministre</p>
            <p>La santé ne peut plus être un luxe réservé à quelques-uns. La Couverture Santé Universelle est un impératif, un droit pour chaque Congolais. Notre engagement est clair : réformer notre système de santé pour qu’il réponde aux besoins de tous, sans distinction de revenu ou de statut social. Cela signifie investir dans nos infrastructures, former et déployer efficacement nos professionnels de santé, et garantir un accès équitable aux soins sur l’ensemble du territoire.</p>
            <blockquote>« Je prends l’engagement de continuer à œuvrer davantage pour le bien-être de la population congolaise selon sa vision de la Couverture Santé universelle. »</blockquote>
          </div>
          <div className="minister-message__visual" aria-label="Composition graphique Couverture Santé Universelle">
            <div className="minister-message__visual-top"><span>CSU / 01</span><span>MINISTÈRE DE LA SANTÉ</span></div>
            <div className="minister-message__visual-orbit minister-message__visual-orbit--one" />
            <div className="minister-message__visual-orbit minister-message__visual-orbit--two" />
            <div className="minister-message__visual-cross">+</div>
            <div className="minister-message__visual-title">La santé<br /><em>est la première<br />pierre.</em></div>
            <div className="minister-message__visual-footer"><span>COUVERTURE SANTÉ<br />UNIVERSELLE</span><strong>N</strong></div>
          </div>
        </section>

        <section id="ministere" className="intro-section page-shell"><div className="intro-copy"><span className="section-label">LE MINISTÈRE</span><h2>Une institution au service de la <strong>santé de tous.</strong></h2><p>Notre mission est de garantir à chaque citoyenne et chaque citoyen un accès équitable à des soins de qualité. À travers nos programmes et nos partenaires, nous coordonnons une action publique qui protège, soigne et accompagne.</p><a className="underlined-link" href="#programmes">Découvrir l’institution <Arrow /></a></div><div className="intro-badge"><span>nod</span><strong>.jc</strong><small>Informer · Agir · Protéger</small></div></section>

        <section id="csu" className="institution-section page-shell"><div className="section-topline"><div><span className="section-label">NOS INSTITUTIONS</span><h2>Des acteurs engagés<br /><strong>pour votre santé.</strong></h2></div><a className="underlined-link" href="#contact">Voir toutes les institutions <Arrow /></a></div><div className="institution-grid">{institutions.map(([short, title, description, color]) => <a className={`institution-card institution-card--${color}`} href="#contact" key={short}><span className="institution-card__mark">{short}</span><h3>{title}</h3><p>{description}</p><b><Arrow /></b></a>)}</div></section>

        <section id="programmes" className="programme-band"><div className="page-shell programme-band__inner"><div><span className="section-label">COUVERTURE SANTÉ UNIVERSELLE</span><h2>La santé,<br /><strong>un droit pour tous.</strong></h2><p>Découvrez le programme national qui place l’accès aux soins au centre de l’action publique.</p><a className="reference-button reference-button--red" href="#contact">En savoir plus <Arrow /></a></div><div className="programme-visual"><span className="visual-circle visual-circle--one" /><span className="visual-circle visual-circle--two" /><span className="visual-cross">+</span><span className="visual-word">CSU</span></div></div></section>

        <section id="actualites" className="news-section page-shell"><div className="section-topline"><div><span className="section-label">À LA UNE</span><h2>Les dernières <strong>actualités.</strong></h2></div><a className="underlined-link" href="#actualites">Voir toutes les actualités <Arrow /></a></div><div className="news-layout"><article className="featured-news"><div className="featured-news__image"><span>nod.jc<br /><b>ACTU</b></span></div><div className="featured-news__body"><span className="news-meta">16/10/2026 · ACTUALITÉ</span><h3>Un seul plan, un seul budget, une seule coordination</h3><p>Dans la riposte contre l’épidémie, l’efficacité repose autant sur les moyens mobilisés que sur la manière de les organiser.</p><a className="underlined-link" href="#contact">Lire l’article <Arrow /></a></div></article><div className="news-list">{news.slice(1).map(([date, tag, title, excerpt]) => <article className="news-row" key={date}><time>{date}</time><div><span className="news-meta">{tag}</span><h3>{title}</h3><p>{excerpt}</p><a href="#contact">Lire l’article <Arrow /></a></div></article>)}</div></div></section>

        <section id="magazine" className="magazine-section"><div className="page-shell magazine-inner"><div><span className="section-label">LE MAGAZINE</span><h2>Comprendre.<br /><strong>Partager. Agir.</strong></h2><p>Un regard approfondi sur les enjeux de santé publique et celles et ceux qui font bouger les lignes.</p><a className="reference-button" href="#contact">Lire le magazine <Arrow /></a></div><div className="magazine-cover"><span>MAGAZINE</span><strong>La santé<br /><em>en action</em></strong><small>ÉDITION 01 / 2026</small></div></div></section>

        <section id="agenda" className="agenda-section page-shell"><div className="section-topline"><div><span className="section-label">CALENDRIER</span><h2>Les rendez-vous<br /><strong>à venir.</strong></h2></div><a className="underlined-link" href="#contact">Voir le calendrier <Arrow /></a></div><div className="agenda-grid">{agenda.map(([date, title], index) => <a className={`agenda-card ${index === 0 ? 'is-featured' : ''}`} href="#contact" key={date}><span className="agenda-card__date">{date}</span><h3>{title}</h3><b><Arrow /></b></a>)}</div></section>

        <section id="documents" className="quick-reference"><div className="page-shell quick-reference__inner"><div><span className="section-label">ACCÈS RAPIDE</span><h2>Tout ce dont<br /><strong>vous avez besoin.</strong></h2></div><div className="quick-reference__links"><a href="#contact">DOCUMENTS <Arrow /></a><a href="#contact">CSU <Arrow /></a><a href="#contact">INSTITUTIONS <Arrow /></a><a href="#contact">HÔPITAUX <Arrow /></a><a href="#contact">CONTACT <Arrow /></a></div></div></section>
      </main>

      <footer id="contact" className="reference-footer"><div className="page-shell footer-main"><div className="footer-identity"><a className="reference-logo reference-logo--footer" href="#accueil"><span className="logo-symbol">N</span><span className="logo-copy"><strong>nod</strong><em>.jc</em><small>Portail institutionnel</small></span></a><p>Une information publique<br />claire et accessible.</p><address>Kinshasa / Gombe<br />République démocratique du Congo</address></div><div className="footer-column"><h3>Accès rapide</h3><a href="#documents">Documents</a><a href="#csu">CSU</a><a href="#ministere">Institutions</a><a href="#contact">Hôpitaux</a><a href="#contact">Contact</a></div><div className="footer-column"><h3>Liens utiles</h3><a href="#contact">FSS</a><a href="#contact">INSP</a><a href="#contact">CNSU</a><a href="#contact">ANICNS</a><a href="https://www.who.int/fr">OMS</a></div><div className="footer-column"><h3>Sites institutionnels</h3><a href="#contact">Présidence</a><a href="#contact">Assemblée nationale</a><a href="#contact">Le Sénat</a><a href="#contact">Primature</a><a href="#contact">Cours et tribunaux</a></div></div><div className="page-shell footer-bottom"><span>Tous droits réservés © {year} nod.jc</span><span>Photo hero : Africa CDC · <a href="#contact">Mentions légales</a> · <a href="#contact">Confidentialité</a></span></div></footer>
    </>
  );
}
