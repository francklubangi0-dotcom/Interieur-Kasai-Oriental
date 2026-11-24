import Link from 'next/link';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';
import { territorialEntities } from '../data/territorialEntities';

export default function TerritorialEntitiesPage() {
  return (
    <>
      <SiteHeader activeItem="ENTITÉS TERRITORIALES" />
      <main className="territories-page">
        <header className="territories-hero">
          <div className="page-shell">
            <span className="section-label">ADMINISTRATION DE PROXIMITÉ</span>
            <h1>Les entités territoriales du Kasaï Oriental</h1>
            <p>
              Retrouvez les informations administratives de la ville de Mbuji-Mayi et des cinq territoires de la province.
              Les fiches sont conçues pour accueillir les données validées par les autorités compétentes.
            </p>
          </div>
        </header>

        <div className="page-shell">
          <section className="territories-summary" aria-label="Organisation administrative">
            <div><strong>01</strong><span>Ville</span></div>
            <div><strong>05</strong><span>Territoires</span></div>
            <div><strong>05</strong><span>Communes de Mbuji-Mayi</span></div>
            <div><strong>À confirmer</strong><span>Secteurs</span></div>
            <div><strong>À confirmer</strong><span>Chefferies</span></div>
          </section>

          <section className="territorial-entity-grid" aria-label="Fiches des entités">
            {territorialEntities.map((entity) => (
              <article
                className={`territorial-entity-card ${entity.kind === 'Ville' ? 'territorial-entity-card--city' : ''}`}
                key={entity.slug}
              >
                <span className="territorial-entity-card__type">{entity.kind}</span>
                <h2>{entity.name}</h2>
                <p>
                  {entity.kind === 'Ville'
                    ? 'Mairie, communes, autorités municipales et services de proximité.'
                    : 'Administration du territoire, autorités locales et répertoire des entités.'}
                </p>
                <Link className="territorial-entity-card__link" href={`/entites-territoriales/${entity.slug}`}>
                  Consulter la fiche <span aria-hidden="true">→</span>
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
