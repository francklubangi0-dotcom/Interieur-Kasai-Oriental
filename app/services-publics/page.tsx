import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const services = [
  {
    number: '01',
    title: 'Demander une audience',
    description: 'Adressez une demande au ministère et conservez sa référence pour suivre son traitement.',
    href: '/services-publics/demander-audience',
    action: 'Remplir le formulaire',
  },
  {
    number: '02',
    title: 'Suivre une demande',
    description: 'Consultez le statut de votre demande à l’aide du numéro de suivi communiqué après l’envoi.',
    href: '/services-publics/suivi-audience',
    action: 'Consulter le suivi',
  },
  {
    number: '03',
    title: 'Demander une information',
    description: 'Pour une orientation administrative ou une question sur les services du ministère.',
    href: '/contact',
    action: 'Contacter le ministère',
  },
];

export default function ServicesPublicsPage() {
  return (
    <>
      <SiteHeader activeItem="SERVICES AU PUBLIC" />
      <main className="services-publics-page">
        <header className="services-publics-hero">
          <div className="page-shell">
            <span className="section-label">SERVICES AU PUBLIC · KASAÏ ORIENTAL</span>
            <h1>Des démarches simples, un suivi clair.</h1>
            <p>
              Retrouvez les démarches proposées par le Ministère de l’Intérieur et les
              informations nécessaires pour vous orienter auprès de ses services.
            </p>
          </div>
        </header>

        <div className="page-shell">
          <section className="citizen-service-grid" aria-label="Démarches et services aux citoyens">
            {services.map((service) => (
              <article className="citizen-service-card" key={service.number}>
                <span className="citizen-service-card__number">DÉMARCHE {service.number}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <Link className="citizen-service-card__link" href={service.href}>
                  {service.action}<span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
