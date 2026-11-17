'use client';

import { useEffect, useState } from 'react';

const quickLinks = [
  ['01', '◌', 'Nos programmes', 'Voir les initiatives en cours', '#programmes'],
  ['02', '▤', 'Documents publics', 'Accéder aux ressources', '#ressources'],
  ['03', '⌁', 'Nous contacter', 'Trouver le bon interlocuteur', '#contact'],
  ['04', '◒', 'Nos actualités', 'Les dernières informations', '#actualites'],
];

const programs = [
  ['02', 'Éducation citoyenne', 'Donner les clés pour comprendre et agir'],
  ['03', 'Innovation publique', 'Imaginer des solutions à impact'],
  ['04', 'Territoires en réseau', 'Relier les initiatives qui font avancer'],
];

const resources = [
  ['▤', 'Documents officiels', 'Guides, rapports et textes de référence'],
  ['⌁', 'Répertoire des services', 'Les bons contacts au bon endroit'],
  ['◉', 'Foire aux questions', 'Les réponses aux questions fréquentes'],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="eyebrow"><span />{children}</p>; }

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [year, setYear] = useState('2026');

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <div className="announcement"><div className="shell announcement__inner"><span className="announcement__dot" /><p>Portail d’information publique · République démocratique du Congo</p><a href="#contact">Besoin d’aide ? <Arrow /></a></div></div>

      <header className="site-header">
        <div className="shell header__inner">
          <a className="brand" href="#accueil" aria-label="nod.jc, accueil"><span className="brand__mark"><span>N</span></span><span className="brand__text"><strong>nod</strong><em>.jc</em><small>Portail institutionnel</small></span></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}><span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span><span /><span /></button>
          <nav id="main-nav" className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            {[['Accueil', '#accueil'], ['L’institution', '#institution'], ['Programmes', '#programmes'], ['Actualités', '#actualites'], ['Ressources', '#ressources']].map(([label, href], index) => <a key={label} className={index === 0 ? 'is-active' : ''} href={href} onClick={closeMenu}>{label}</a>)}
          </nav>
          <a className="header__contact" href="#contact">Nous contacter <Arrow /></a>
        </div>
      </header>

      <main id="contenu">
        <section id="accueil" className="hero section-shell"><div className="hero__content reveal"><Eyebrow>Une information qui rapproche</Eyebrow><h1>Le service public, <em>plus proche</em> de vous.</h1><p className="hero__lead">Retrouvez les informations essentielles, les programmes en cours et les ressources publiques réunies dans un même espace.</p><div className="hero__actions"><a className="button button--primary" href="#actualites">Découvrir les actualités <Arrow /></a><a className="text-link" href="#institution">En savoir plus <span aria-hidden="true">→</span></a></div></div><div className="hero__visual reveal reveal--delay" role="img" aria-label="Illustration de la connexion entre citoyens et services publics"><div className="hero__halo hero__halo--one" /><div className="hero__halo hero__halo--two" /><div className="hero__card hero__card--main"><div className="hero__card-top"><span className="mini-logo">N</span><span>NOD.JC / 01</span></div><div className="hero__signal"><span /><span /><span /><span /><span /></div><strong>Une action<br /><em>qui compte.</em></strong><div className="hero__card-line" /></div><div className="hero__card hero__card--floating"><span className="floating-icon">✦</span><span>Informer.<br />Accompagner.</span></div><div className="hero__orbit hero__orbit--left" /><div className="hero__orbit hero__orbit--right" /></div></section>

        <section className="quick-access" aria-labelledby="quick-title"><div className="shell"><div className="section-heading section-heading--compact"><div><Eyebrow>À portée de main</Eyebrow><h2 id="quick-title">Accès rapides</h2></div></div><div className="quick-grid">{quickLinks.map(([number, icon, title, description, href], index) => <a className={`quick-card ${index === 0 ? 'quick-card--accent' : ''}`} href={href} key={number}><span className="quick-card__number">{number}</span><span className="quick-card__icon">{icon}</span><strong>{title}</strong><small>{description} <b><Arrow /></b></small></a>)}</div></div></section>

        <section id="institution" className="institution section-shell"><div className="institution__label reveal"><span className="label-mark">N</span><span>Notre<br />mission</span></div><div className="institution__body reveal reveal--delay"><Eyebrow>L’institution</Eyebrow><h2>Rendre l’action publique <em>lisible, accessible et utile.</em></h2><p>nod.jc met en relation les institutions, les communautés et les citoyens. Nous facilitons l’accès à l’information et donnons de la visibilité aux actions qui améliorent le quotidien.</p><a className="text-link" href="#contact">Comprendre notre démarche <span aria-hidden="true">→</span></a></div><div className="institution__stats reveal reveal--delay-2">{[['24/7', 'Une information', 'toujours disponible'], ['04', 'Axes d’action', 'prioritaires'], ['01', 'Portail pour', 'tous les publics']].map(([stat, first, second]) => <div key={stat}><strong>{stat}</strong><span>{first}<br />{second}</span></div>)}</div></section>

        <section id="actualites" className="news section-shell"><div className="section-heading reveal"><div><Eyebrow>Le fil de l’action</Eyebrow><h2>À la une</h2></div><a className="text-link" href="#actualites">Toutes les actualités <span aria-hidden="true">→</span></a></div><div className="news-grid"><article className="news-feature reveal"><div className="news-feature__art"><span className="art-label">N / 2026</span><div className="art-shape art-shape--one" /><div className="art-shape art-shape--two" /><div className="art-shape art-shape--three" /><span className="art-caption">Agir ensemble<br /><em>pour demain</em></span></div><div className="news-feature__copy"><span className="tag">À la une</span><h3>Construire des services qui répondent aux réalités de chacun.</h3><p>Une nouvelle étape pour placer l’écoute, l’accès et la proximité au cœur de l’action publique.</p><a className="arrow-link" href="#contact">Lire l’article <Arrow /></a></div></article><div className="news-list reveal reveal--delay">{[['18.10.2026', 'Communiqué', 'Le portail évolue pour mieux vous accompagner.'], ['30.09.2026', 'Programme', 'Les territoires au centre de la prochaine initiative.'], ['12.09.2026', 'Ressource', 'Retrouvez les documents de référence de nod.jc.']].map(([date, tag, title]) => <article className="news-item" key={date}><time>{date}</time><div><span className="tag">{tag}</span><h3>{title}</h3><a href="#contact">Lire la suite <span aria-hidden="true">→</span></a></div></article>)}</div></div></section>

        <section id="programmes" className="programs section-shell"><div className="section-heading reveal"><div><Eyebrow>Des engagements concrets</Eyebrow><h2>Nos programmes</h2></div><a className="text-link" href="#contact">Voir tous les programmes <span aria-hidden="true">→</span></a></div><div className="programs__layout"><div className="program-intro reveal"><span className="program-intro__index">01 / 04</span><h3>Proximité<br /><em>et accès</em></h3><p>Faire circuler les informations utiles jusque dans les lieux où elles sont attendues.</p><a className="button button--dark" href="#contact">Découvrir le programme <Arrow /></a></div><div className="program-rows reveal reveal--delay">{programs.map(([number, title, description]) => <a href="#contact" className="program-row" key={number}><span>{number}</span><strong>{title}</strong><small>{description}</small><b><Arrow /></b></a>)}</div></div></section>

        <section id="ressources" className="resources section-shell"><div className="resources__intro reveal"><Eyebrow>À votre disposition</Eyebrow><h2>Ressources<br /><em>du portail</em></h2><p>Documents, repères et contacts : allez directement à l’information qui vous concerne.</p></div><div className="resources__links reveal reveal--delay">{resources.map(([icon, title, description]) => <a href="#contact" key={title}><span className="resource-icon">{icon}</span><span><strong>{title}</strong><small>{description}</small></span><b><Arrow /></b></a>)}</div></section>

        <section id="contact" className="contact section-shell"><div className="contact__inner reveal"><Eyebrow>Un lien direct</Eyebrow><h2>Une question ?<br /><em>Parlons-nous.</em></h2><p>Notre équipe vous oriente vers la bonne information et le bon interlocuteur.</p><a className="button button--lime" href="mailto:bonjour@nod.jc">Écrire à nod.jc <Arrow /></a></div><div className="contact__orb" aria-hidden="true"><span>↗</span></div></section>
      </main>

      <footer className="site-footer"><div className="shell footer__top"><div className="footer__brand"><a className="brand brand--footer" href="#accueil"><span className="brand__mark"><span>N</span></span><span className="brand__text"><strong>nod</strong><em>.jc</em><small>Portail institutionnel</small></span></a><p>Une information publique<br />claire et accessible.</p></div><div className="footer__col"><h3>Explorer</h3><a href="#institution">L’institution</a><a href="#programmes">Programmes</a><a href="#actualites">Actualités</a><a href="#ressources">Ressources</a></div><div className="footer__col"><h3>Liens utiles</h3><a href="#contact">Documents</a><a href="#contact">Services publics</a><a href="#contact">Partenaires</a><a href="#contact">Presse</a></div><div className="footer__col footer__col--contact"><h3>Nous trouver</h3><p>30, avenue de la Justice<br />Kinshasa / Gombe<br />République démocratique du Congo</p><a href="mailto:bonjour@nod.jc">bonjour@nod.jc</a></div></div><div className="shell footer__bottom"><span>© {year} nod.jc · Tous droits réservés</span><div><a href="#contact">Mentions légales</a><a href="#contact">Politique de confidentialité</a><span className="footer__language">FR <span aria-hidden="true">⌄</span></span></div></div></footer>
    </>
  );
}
