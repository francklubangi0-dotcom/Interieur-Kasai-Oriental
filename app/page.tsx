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
  ['08 SEPTEMBRE 2027', 'Journée mondiale de la physiothérapie'],
  ['10 SEPTEMBRE 2027', 'Journée mondiale de prévention du suicide'],
  ['12 SEPTEMBRE 2027', 'Journée mondiale des premiers secours'],
  ['21 SEPTEMBRE 2027', 'Journée mondiale de la maladie d’Alzheimer'],
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
          <div className="minister-message__visual">
            <Image src={ministerPhoto} alt="Le ministre Patrick Mukendi Makanda échange avec des habitants" fill sizes="(max-width: 800px) 100vw, 50vw" className="minister-message__image" />
          </div>
        </section>

        <section id="priorities" className="priorities-section" aria-labelledby="priorities-title">
          <div className="page-shell">
            <ScrollReveal className="priorities-reveal">
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

        <section id="services" className="institution-section page-shell"><div className="section-topline"><div><span className="section-label">SERVICES AU PUBLIC</span><h2>Des services essentiels<br /><strong>à votre disposition.</strong></h2></div><a className="underlined-link" href="/contact">Contacter le Ministère <Arrow /></a></div><div className="institution-grid">{publicServices.map((service) => <a className={`institution-card institution-card--${service.color}`} href={service.href} key={service.mark}><span className="institution-card__mark">{service.mark}</span><h3>{service.title}</h3><p>{service.description}</p><b><Arrow /></b></a>)}</div></section>

        <ScrollReveal className="province-reveal">
          <ProvinceExplorer />
        </ScrollReveal>

        <HomeNewsSection initialItems={getPublishedNews()} />

        <section id="publications" className="magazine-section"><div className="page-shell magazine-inner"><div><span className="section-label">PUBLICATIONS</span><h2>Informations.<br /><strong>Rapports. Documents.</strong></h2><p>Consultez les publications institutionnelles du Ministère de l’Intérieur du Kasaï-Oriental et les documents utiles à la population.</p><a className="reference-button" href="#contact">Voir les publications <Arrow /></a></div><div className="magazine-cover"><span>PUBLICATION</span><strong>Action<br /><em>publique</em></strong><small>ÉDITION 2026</small></div></div></section>

        <section id="agenda" className="agenda-section page-shell"><div className="section-topline"><div><span className="section-label">CALENDRIER</span><h2>Les rendez-vous<br /><strong>à venir.</strong></h2></div><a className="underlined-link" href="#contact">Voir le calendrier <Arrow /></a></div><div className="agenda-grid">{agenda.map(([date, title], index) => <a className={`agenda-card ${index === 0 ? 'is-featured' : ''}`} href="#contact" key={date}><span className="agenda-card__date">{date}</span><h3>{title}</h3><b><Arrow /></b></a>)}</div></section>

      </main>

      <SiteFooter />
    </>
  );
}
