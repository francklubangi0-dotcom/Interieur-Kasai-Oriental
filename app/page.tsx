import Image from 'next/image';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import HomeHero from './components/HomeHero';
import logo from '../images/RIJEC DESIGN (11).png';
import heroImage from '../images/MIN.jpeg';
import ministerPhoto from '../images/Patrick Min.jpeg';

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
  ['07/10/2026', 'ACTUALITÉ', 'Consultations et identification des conflits coutumiers dans la chefferie de Bakwa Kalonji', 'La séance est présidée par le gouverneur de province.'],
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

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <HomeHero />

        <section className="minister-message page-shell" aria-labelledby="minister-message-title">
          <div className="minister-message__copy">
            <span className="section-label">LE MOT DU MINISTRE</span>
            <h2 id="minister-message-title">ME.<br /><strong>PATRICK MUKENDI MAKANDA</strong></h2>
            <p className="minister-message__role">Ministre</p>
            <p>La sécurité et la protection des citoyens ne peuvent être réservées à quelques-uns. Elles sont un droit pour chaque habitant du Kasaï Oriental et une responsabilité essentielle des pouvoirs publics. Notre engagement est clair : renforcer l’action du ministère de l’Intérieur afin de répondre aux besoins de toute la population, sans distinction. Cela signifie consolider les services de proximité, améliorer la coordination avec les autorités locales et les services de sécurité, et promouvoir la paix, la cohésion sociale et la protection des personnes sur l’ensemble de la province.</p>
            <blockquote>« Je prends l’engagement de poursuivre et d’intensifier mes efforts au service du bien-être de la population du Kasaï Oriental, en contribuant au maintien de la paix, à la sécurité de proximité et à la cohésion sociale, conformément aux missions du ministère de l’Intérieur. »</blockquote>
          </div>
          <div className="minister-message__visual">
            <Image src={ministerPhoto} alt="Le ministre Patrick Mukendi Makanda échange avec des habitants" fill sizes="(max-width: 800px) 100vw, 50vw" className="minister-message__image" />
          </div>
        </section>

        <section id="ministere" className="intro-section page-shell">
          <div className="intro-copy">
            <span className="section-label">LE MINISTÈRE</span>
            <h2>Une institution au service de la <strong className="intro-copy__highlight">sécurité de tous.</strong></h2>
            <p>Notre mission est de contribuer à la paix, à la sécurité et à la cohésion sociale dans toute la province du Kasaï Oriental. En coordonnant l’action des autorités locales et des services concernés, nous œuvrons à la protection des citoyens et au maintien de l’ordre public, dans le respect des droits de chacun.</p>
            <a className="underlined-link" href="#programmes">Découvrir l’institution <Arrow /></a>
          </div>
          <div className="intro-badge"><Image src={logo} alt="Ministère de l’Intérieur du Kasaï-Oriental" className="intro-badge__logo" /><small>Informer · Agir · Protéger</small></div>
        </section>

        <section id="missions" className="missions-home-section">
          <div className="page-shell missions-home-inner">
            <div>
              <span className="section-label">NOS MISSIONS</span>
              <h2>Agir pour la paix, la sécurité<br /><strong>et la gouvernance locale.</strong></h2>
              <p>Le Ministère de l’Intérieur du Kasaï-Oriental veille à la bonne administration de la province, à la sécurité des personnes et des biens, au maintien de la paix, à la promotion de la décentralisation et à l’encadrement des autorités coutumières. Il contribue au renforcement de l’autorité de l’État, à la prévention des conflits et à l’amélioration de la gouvernance locale au service de la population.</p>
              <a className="reference-button" href="/missions">En savoir plus <Arrow /></a>
            </div>
          </div>
        </section>

        <aside className="report-alert page-shell" aria-label="Signaler une préoccupation">
          <div>
            <span>VOTRE VOIX COMPTE</span>
            <h2>Rencontrez-vous une préoccupation sécuritaire ou administrative ?</h2>
          </div>
          <a className="report-alert__button" href="/signaler">Signaler une préoccupation <Arrow /></a>
        </aside>

        <section id="services" className="institution-section page-shell"><div className="section-topline"><div><span className="section-label">SERVICES AU PUBLIC</span><h2>Des services essentiels<br /><strong>à votre disposition.</strong></h2></div><a className="underlined-link" href="#contact">Voir tous les services <Arrow /></a></div><div className="institution-grid">{institutions.map(([short, title, description, color]) => <a className={`institution-card institution-card--${color}`} href="#contact" key={short}><span className="institution-card__mark">{short}</span><h3>{title}</h3><p>{description}</p><b><Arrow /></b></a>)}</div></section>

        <section id="programmes" className="programme-band"><div className="page-shell programme-band__inner"><div><span className="section-label">COUVERTURE SANTÉ UNIVERSELLE</span><h2>La santé,<br /><strong>un droit pour tous.</strong></h2><p>Découvrez le programme national qui place l’accès aux soins au centre de l’action publique.</p><a className="reference-button reference-button--red" href="#contact">En savoir plus <Arrow /></a></div><div className="programme-visual"><span className="visual-circle visual-circle--one" /><span className="visual-circle visual-circle--two" /><span className="visual-cross">+</span><span className="visual-word">CSU</span></div></div></section>

        <section id="actualites" className="news-section page-shell">
          <div className="section-topline">
            <div><span className="section-label">À LA UNE</span><h2>Les dernières <strong>actualités.</strong></h2></div>
            <a className="underlined-link" href="#actualites">Voir toutes les actualités <Arrow /></a>
          </div>
          <div className="news-layout">
            <article className="featured-news" id="actualite-20-10-2026">
              <div className="featured-news__image"><Image src={heroImage} alt="Le ministre provincial de l’Intérieur assure l’intérim du gouverneur" className="featured-news__photo" /></div>
              <div className="featured-news__body">
                <span className="news-meta">20/10/2026 · ACTUALITÉ</span>
                <h3>Le ministre provincial de l’Intérieur assure l’intérim du gouverneur</h3>
                <p>En l&apos;absence du gouverneur et du vice-gouverneur, Me Patrick Mukendi Makanda est appelé à assurer l&apos;intérim à la tête de la province du Kasaï Oriental.</p>
                <a className="underlined-link" href="#contact">Lire l’article <Arrow /></a>
              </div>
            </article>
            <div className="news-list">
              {news.slice(1).map(([date, tag, title, excerpt]) => (
                <article className="news-row" id={`actualite-${date.replace(/\//g, '-')}`} key={date}>
                  <time>{date}</time>
                  <div>
                    <span className="news-meta">{tag}</span>
                    <h3>{title}</h3>
                    <p>{excerpt}</p>
                    <a href="#contact">Lire l’article <Arrow /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="magazine-section"><div className="page-shell magazine-inner"><div><span className="section-label">PUBLICATIONS</span><h2>Informations.<br /><strong>Rapports. Documents.</strong></h2><p>Consultez les publications institutionnelles du Ministère de l’Intérieur du Kasaï-Oriental et les documents utiles à la population.</p><a className="reference-button" href="#contact">Voir les publications <Arrow /></a></div><div className="magazine-cover"><span>PUBLICATION</span><strong>Action<br /><em>publique</em></strong><small>ÉDITION 2026</small></div></div></section>

        <section id="agenda" className="agenda-section page-shell"><div className="section-topline"><div><span className="section-label">CALENDRIER</span><h2>Les rendez-vous<br /><strong>à venir.</strong></h2></div><a className="underlined-link" href="#contact">Voir le calendrier <Arrow /></a></div><div className="agenda-grid">{agenda.map(([date, title], index) => <a className={`agenda-card ${index === 0 ? 'is-featured' : ''}`} href="#contact" key={date}><span className="agenda-card__date">{date}</span><h3>{title}</h3><b><Arrow /></b></a>)}</div></section>

      </main>

      <SiteFooter />
    </>
  );
}
