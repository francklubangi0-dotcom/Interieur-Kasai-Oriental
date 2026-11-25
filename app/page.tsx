import Image from 'next/image';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import HomeHero from './components/HomeHero';
import HomeNewsSection from './components/HomeNewsSection';
import ProvinceExplorer from './components/ProvinceExplorer';
import ScrollReveal from './components/ScrollReveal';
import logo from '../images/RIJEC DESIGN (11).png';
import ministerPhoto from '../images/Patrick Min.jpeg';
import { getPublishedNews } from './data/news';

const publicServices = [
  { mark: '01', title: 'Signaler une situation urgente', description: 'Uniquement pour transmettre une information nécessitant l’attention des autorités.', color: 'red', href: '/signaler' },
  { mark: '02', title: 'Demander une information administrative', description: 'Pour une demande d’information concernant une procédure, un service, un texte officiel ou une orientation administrative.', color: 'blue', href: '/contact' },
  { mark: '03', title: 'Demander une audience', description: 'Envoyez votre demande au Ministère et conservez son numéro de suivi.', color: 'green', href: '/services-publics/demander-audience' },
  { mark: '04', title: 'Signaler une rumeur', description: 'Transmettez les informations susceptibles de provoquer la panique ou de troubler la paix sociale.', color: 'yellow', href: '/signaler' },
  { mark: '05', title: 'Contacter un service territorial', description: 'Prenez contact avec votre territoire.', color: 'orange', href: '/contact' },
  { mark: '06', title: 'Télécharger un formulaire', description: 'Retrouvez les formulaires et documents utiles à vos démarches administratives.', color: 'purple', href: '/#publications' },
];

const agenda = [
  { date: '18 FÉVRIER 2027', isoDate: '2027-02-18', title: 'Concertation sur la sécurité de proximité' },
  { date: '12 MARS 2027', isoDate: '2027-03-12', title: 'Sensibilisation à la sécurité routière' },
  { date: '18 JUIN 2027', isoDate: '2027-06-18', title: 'Échanges avec les autorités territoriales' },
  { date: '21 SEPTEMBRE 2027', isoDate: '2027-09-21', title: 'Dialogue pour la cohésion sociale' },
];

const priorities = [
  {
    icon: 'security',
    title: 'Sécurité et ordre public',
    description: 'Contribuer à la prévention de l’insécurité, à la coordination des acteurs compétents et à la protection des personnes et des biens, dans le respect des lois et des droits fondamentaux.',
  },
  {
    icon: 'territory',
    title: 'Administration territoriale',
    description: 'Renforcer la présence de l’État dans les territoires, communes, secteurs, chefferies et groupements, et améliorer la circulation de l’information administrative.',
  },
  {
    icon: 'decentralization',
    title: 'Décentralisation',
    description: 'Accompagner les entités territoriales décentralisées dans la mise en œuvre de leurs responsabilités, de leur gouvernance et de leur développement local.',
  },
  {
    icon: 'peace',
    title: 'Paix et affaires coutumières',
    description: 'Prévenir les conflits coutumiers, favoriser le dialogue et valoriser le rôle des autorités coutumières dans la cohésion sociale et le développement.',
  },
  {
    icon: 'dialogue',
    title: 'Dialogue institutionnel',
    description: 'Assurer une relation régulière, respectueuse et documentée avec l’Assemblée provinciale, les autres provinces et les institutions nationales.',
  },
  {
    icon: 'digital',
    title: 'Transformation numérique',
    description: 'Utiliser les technologies de l’information et de la communication pour moderniser l’administration, faciliter l’accès à l’information et rapprocher les services publics des citoyens.',
  },
] as const;

type PriorityIconName = (typeof priorities)[number]['icon'];

const priorityIconPaths: Record<PriorityIconName, string[]> = {
  security: ['M12 3 19 6v5c0 4.7-2.8 8-7 10-4.2-2-7-5.3-7-10V6l7-3Z', 'm9 12 2 2 4-4'],
  territory: ['M3 6 9 3l6 3 6-3v15l-6 3-6-3-6 3V6Z', 'M9 3v15', 'M15 6v15'],
  decentralization: ['M12 7v5', 'm6 18 6-6 6 6'],
  peace: ['M4 5h16v11H9l-5 4V5Z', 'M8 9h8', 'M8 12h5'],
  dialogue: ['M3 21h18', 'M5 21V8l7-4 7 4v13', 'M9 21v-8h6v8', 'M8 9h.01', 'M12 9h.01', 'M16 9h.01'],
  digital: ['M3 4h18v13H3z', 'M8 21h8', 'M12 17v4', 'M8 9h2l2-2 2 4 2-2h1'],
};

function PriorityIcon({ name }: { name: PriorityIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {priorityIconPaths[name].map((path) => (
        <path key={path} d={path} />
      ))}
      {name === 'decentralization' && (
        <>
          <circle cx="12" cy="5" r="2" />
          <circle cx="5" cy="19" r="2" />
          <circle cx="19" cy="19" r="2" />
        </>
      )}
    </svg>
  );
}

function Arrow() { return <span aria-hidden="true">→</span>; }

export default function HomePage() {
  return (
    <>
      <SiteHeader showUrgentTicker />

      <main>
        <HomeHero />

        <section className="minister-message page-shell" aria-labelledby="minister-message-title">
          <div className="minister-message__copy">
            <span className="section-label">LE MOT DU MINISTRE</span>
            <h2 id="minister-message-title">ME.<br /><strong>PATRICK MUKENDI MAKANDA</strong></h2>
            <p className="minister-message__role">Ministre</p>
            <p>La sécurité et la protection des citoyens ne peuvent être réservées à quelques-uns. Elles sont un droit pour chaque habitant du Kasaï Oriental et une responsabilité essentielle des pouvoirs publics. Notre engagement est clair : renforcer l’action du ministère de l’Intérieur afin de répondre aux besoins de toute la population, sans distinction. Cela signifie consolider les services de proximité, améliorer la coordination avec les autorités locales et les services de sécurité, et promouvoir la paix, la cohésion sociale et la protection des personnes sur l’ensemble de la province.</p>
            <blockquote>« Je prends l’engagement de poursuivre et d’intensifier mes efforts au service du bien-être de la population du Kasaï Oriental, en contribuant au maintien de la paix, à la sécurité de proximité et à la cohésion sociale, conformément aux missions du ministère de l’Intérieur. »</blockquote>
            <a className="reference-button minister-message__button" href="/message-ministre">Lire le message complet <Arrow /></a>
          </div>
          <ScrollReveal className="minister-message__visual" waitForIntersection>
            <Image src={ministerPhoto} alt="Le ministre Patrick Mukendi Makanda échange avec des habitants" fill sizes="(max-width: 800px) 100vw, 50vw" className="minister-message__image" />
          </ScrollReveal>
        </section>

        <section id="priorities" className="priorities-section" aria-labelledby="priorities-title">
          <div className="page-shell">
            <ScrollReveal className="priorities-reveal" waitForIntersection>
              <header className="priorities-heading">
                <span className="section-label">LE RÔLE DU MINISTÈRE</span>
                <h2 id="priorities-title">Nos priorités</h2>
                <p>Les engagements qui guident l’action du Ministère au service de la population du Kasaï-Oriental.</p>
              </header>
              <div className="priorities-grid">
                {priorities.map((priority) => (
                  <article className="priority-card" key={priority.title}>
                    <span className="priority-card__icon"><PriorityIcon name={priority.icon} /></span>
                    <h3>{priority.title}</h3>
                    <p>{priority.description}</p>
                  </article>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="ministere" className="intro-section page-shell">
          <div className="intro-copy">
            <span className="section-label">LE MINISTÈRE</span>
            <h2>Une institution au service de la <strong className="intro-copy__highlight">sécurité de tous.</strong></h2>
            <p>Notre mission est de contribuer à la paix, à la sécurité et à la cohésion sociale dans toute la province du Kasaï Oriental. En coordonnant l’action des autorités locales et des services concernés, nous œuvrons à la protection des citoyens et au maintien de l’ordre public, dans le respect des droits de chacun.</p>
            <a className="underlined-link" href="#explorer-province">Découvrir la province <Arrow /></a>
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

        <section className="citizen-awareness" aria-labelledby="citizen-awareness-title">
          <div className="page-shell">
            <header className="citizen-awareness__heading">
              <div>
                <span className="section-label">PRÉVENTION &amp; CITOYENNETÉ</span>
                <h2 id="citizen-awareness-title">Ensemble, cultivons les bons réflexes.</h2>
              </div>
              <p>Sur la route, en ligne ou dans nos quartiers, chaque geste compte pour un Kasaï Oriental plus sûr.</p>
            </header>
            <div className="awareness-grid">
              <article className="awareness-card awareness-card--road">
                <div className="awareness-card__visual awareness-card__visual--road">
                  <span className="awareness-card__tag">01 / SÉCURITÉ ROUTIÈRE</span>
                  <svg viewBox="0 0 360 180" fill="none" aria-hidden="true">
                    <circle cx="185" cy="90" r="72" fill="#F8DB7A" />
                    <path d="M0 148h360v32H0z" fill="#123E59" />
                    <path d="M74 152h28l-8 12H66zm50 0h28l-8 12h-28zm50 0h28l-8 12h-28zm50 0h28l-8 12h-28z" fill="#fff" />
                    <path d="M209 128h84l-8-27-15-13h-35l-15 13z" fill="#fff" stroke="#123E59" strokeWidth="4" strokeLinejoin="round" />
                    <path d="M231 102h45l-10-10h-25z" fill="#A4D7DC" />
                    <circle cx="229" cy="129" r="8" fill="#123E59" /><circle cx="276" cy="129" r="8" fill="#123E59" />
                    <circle cx="147" cy="72" r="9" fill="#123E59" />
                    <path d="m145 85-11 20 17 10 5 18m-12-47 15 13 13 2m-23 13-15 19" stroke="#123E59" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M55 141V70m-17 0h34L55 43z" stroke="#123E59" strokeWidth="4" strokeLinejoin="round" fill="#fff" />
                  </svg>
                </div>
                <div className="awareness-card__body">
                  <h3>Sur la route, ralentissons.</h3>
                  <p>La prudence protège tous les usagers, en particulier les enfants et les piétons.</p>
                  <ul><li>Respectez la signalisation et les limitations.</li><li>Ralentissez près des écoles et des marchés.</li><li>À moto, portez un casque adapté.</li></ul>
                </div>
              </article>
              <article className="awareness-card awareness-card--digital">
                <div className="awareness-card__visual awareness-card__visual--digital">
                  <span className="awareness-card__tag">02 / VIGILANCE NUMÉRIQUE</span>
                  <svg viewBox="0 0 360 180" fill="none" aria-hidden="true">
                    <circle cx="183" cy="93" r="75" fill="#18506D" />
                    <rect x="113" y="24" width="93" height="136" rx="14" fill="#fff" stroke="#A8D9D4" strokeWidth="4" />
                    <path d="M139 38h41M147 145h25" stroke="#123E59" strokeWidth="4" strokeLinecap="round" />
                    <rect x="129" y="63" width="61" height="49" rx="6" fill="#E5F4F1" />
                    <path d="M140 78h38M140 89h24M140 100h30" stroke="#79A9A6" strokeWidth="4" strokeLinecap="round" />
                    <path d="m221 66 44 14v27c0 26-18 40-44 50-26-10-44-24-44-50V80z" fill="#F6D36D" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
                    <rect x="205" y="99" width="32" height="25" rx="4" fill="#123E59" />
                    <path d="M211 99v-7a10 10 0 0 1 20 0v7" stroke="#123E59" strokeWidth="5" />
                    <circle cx="221" cy="110" r="3" fill="#fff" />
                  </svg>
                </div>
                <div className="awareness-card__body">
                  <h3>Face aux fraudes, vérifions.</h3>
                  <p>Un message alarmant ou une demande de paiement inhabituelle doit éveiller la vigilance.</p>
                  <ul><li>Ne partagez jamais vos codes ou mots de passe.</li><li>Vérifiez l’identité de votre interlocuteur par un canal officiel.</li><li>Ne payez pas sous la pression d’un message suspect.</li></ul>
                </div>
              </article>
              <article className="awareness-peace">
                <Image src={ministerPhoto} alt="Échange entre le ministre et des membres de la communauté" fill sizes="(max-width: 800px) 100vw, 35vw" className="awareness-peace__photo" />
                <div className="awareness-peace__content">
                  <span className="awareness-card__tag">03 / VIVRE-ENSEMBLE</span>
                  <span className="awareness-peace__mark" aria-hidden="true">“</span>
                  <h3>La paix se construit chaque jour, par le dialogue et le respect.</h3>
                  <p>Face à un différend, privilégions l’écoute et rapprochons-nous des autorités compétentes.</p>
                </div>
              </article>
            </div>
            <div className="awareness-footer">
              <p><strong>Un doute, une préoccupation ?</strong> Ne relayez pas une information non vérifiée.</p>
              <a href="/signaler">Signaler une préoccupation <Arrow /></a>
            </div>
          </div>
        </section>

        <section id="services" className="institution-section page-shell"><div className="section-topline"><div><span className="section-label">SERVICES AU PUBLIC</span><h2>Des services essentiels<br /><strong>à votre disposition.</strong></h2></div><a className="underlined-link" href="/contact">Contacter le Ministère <Arrow /></a></div><div className="institution-grid">{publicServices.map((service) => <a className={`institution-card institution-card--${service.color}`} href={service.href} key={service.mark}><span className="institution-card__mark">{service.mark}</span><h3>{service.title}</h3><p>{service.description}</p><b><Arrow /></b></a>)}</div></section>

        <ScrollReveal className="province-reveal">
          <ProvinceExplorer />
        </ScrollReveal>

        <HomeNewsSection initialItems={getPublishedNews()} />

        <section id="publications" className="magazine-section"><div className="page-shell magazine-inner"><div><span className="section-label">PUBLICATIONS</span><h2>Informations.<br /><strong>Rapports. Documents.</strong></h2><p>Consultez les publications institutionnelles du Ministère de l’Intérieur du Kasaï-Oriental et les documents utiles à la population.</p><a className="reference-button" href="#contact">Voir les publications <Arrow /></a></div><div className="magazine-cover"><span>PUBLICATION</span><strong>Action<br /><em>publique</em></strong><small>ÉDITION 2026</small></div></div></section>

        <section id="agenda" className="agenda-section page-shell" aria-labelledby="agenda-title">
          <div className="section-topline">
            <div>
              <span className="section-label">CALENDRIER</span>
              <h2 id="agenda-title">Les rendez-vous<br /><strong>en perspective.</strong></h2>
              <p className="agenda-note">Pistes d’activités indicatives : dates et organisation à confirmer. Ce calendrier n’annonce pas d’événements officiels.</p>
            </div>
            <a className="underlined-link" href="/contact">Contacter le Ministère <Arrow /></a>
          </div>
          <div className="agenda-grid">{agenda.map(({ date, isoDate, title }, index) => (
            <article className={`agenda-card ${index === 0 ? 'is-featured' : ''}`} key={date}>
              <span className="agenda-card__date"><time dateTime={isoDate}>{date}</time> · À CONFIRMER</span><h3>{title}</h3>
            </article>
          ))}</div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
