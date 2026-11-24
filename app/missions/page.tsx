import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const missions = [
  {
    title: 'Sécurité et ordre public',
    description: 'Contribuer à la protection des personnes et des biens ainsi qu’au maintien de la paix et de l’ordre public dans la province.',
  },
  {
    title: 'Coordination territoriale',
    description: 'Renforcer la coordination entre les autorités provinciales, les entités territoriales et les services concernés.',
  },
  {
    title: 'Paix et cohésion sociale',
    description: 'Prévenir les tensions et soutenir le dialogue, la cohabitation pacifique et la cohésion entre les communautés.',
  },
  {
    title: 'Affaires coutumières',
    description: 'Accompagner les autorités coutumières et contribuer à leur collaboration avec les institutions provinciales.',
  },
];

export default function MissionsPage() {
  return (
    <>
      <SiteHeader activeItem="LE MINISTÈRE" />
      <main className="missions-page">
        <section className="page-shell">
          <span className="section-label">LE MINISTÈRE</span>
          <h1>Nos Missions et Attributions</h1>
          <p className="missions-page__intro">Le Ministère de l’Intérieur du Kasaï-Oriental veille à la bonne administration de la province, à la sécurité des personnes et des biens, au maintien de la paix, à la promotion de la décentralisation et à l’encadrement des autorités coutumières. Il contribue au renforcement de l’autorité de l’État, à la prévention des conflits et à l’amélioration de la gouvernance locale au service de la population.</p>
          <div className="missions-grid">
            {missions.map((mission, index) => (
              <article className="mission-card" key={mission.title}>
                <span className="mission-card__number">0{index + 1}</span>
                <h2>{mission.title}</h2>
                <p>{mission.description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
