import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteFooter from '../../components/SiteFooter';
import SiteHeader from '../../components/SiteHeader';
import { territorialEntities } from '../../data/territorialEntities';

export const metadata: Metadata = {
  title: 'Fiche d’une entité territoriale — Ministère de l’Intérieur',
};

export function generateStaticParams() {
  return territorialEntities.map(({ slug }) => ({ slug }));
}

function showValue(value: string | number | null, suffix = '') {
  return value === null ? 'À confirmer' : `${value}${suffix}`;
}

export default async function TerritorialEntityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entity = territorialEntities.find((item) => item.slug === slug);
  if (!entity) notFound();

  return (
    <>
      <SiteHeader activeItem="ENTITÉS TERRITORIALES" />
      <main className="territories-page">
        <div className="page-shell">
          <Link className="page-back-link" href="/entites-territoriales">← Toutes les entités territoriales</Link>
        </div>
        <header className="territories-hero">
          <div className="page-shell">
            <span className="section-label">{entity.kind.toUpperCase()} · KASAÏ ORIENTAL</span>
            <h1>{entity.name}</h1>
            <p>Fiche institutionnelle pour les autorités, les données territoriales et les services de proximité.</p>
          </div>
        </header>

        <div className="page-shell">
          <section className="territory-detail-panel" aria-labelledby="entity-facts-title">
            <div className="territory-detail-panel__head">
              <div>
                <span className="section-label">REPÈRES ADMINISTRATIFS</span>
                <h2 id="entity-facts-title">Informations de l’entité</h2>
              </div>
              <span className="territorial-entity-card__type">{entity.kind}</span>
            </div>

            <div className="territory-facts">
              <div className="territory-fact">
                <span>{entity.administratorTitle}</span>
                <strong>{showValue(entity.administrator)}</strong>
                {entity.administratorNote && entity.administratorSource && (
                  <small className="territory-fact__source">
                    {entity.administratorNote}{' '}
                    <a href={entity.administratorSource} target="_blank" rel="noreferrer">Source publique</a>
                  </small>
                )}
              </div>
              <div className="territory-fact">
                <span>{entity.kind === 'Ville' ? 'Maire adjoint' : 'Administrateur adjoint'}</span>
                <strong>{showValue(entity.deputyAdministrator)}</strong>
              </div>
              <div className="territory-fact">
                <span>Superficie</span>
                <strong>{showValue(entity.areaKm2, ' km²')}</strong>
              </div>
              <div className="territory-fact">
                <span>Population estimée</span>
                <strong>{showValue(entity.populationEstimate)}</strong>
              </div>
              <div className="territory-fact">
                <span>Téléphone officiel</span>
                <strong>{showValue(entity.contactPhone)}</strong>
              </div>
              <div className="territory-fact">
                <span>Courriel officiel</span>
                <strong>{showValue(entity.contactEmail)}</strong>
              </div>
            </div>

            {entity.kind === 'Ville' ? (
              <>
                <h2 className="section-label">MAIRIE ET COMMUNES</h2>
                <div className="commune-directory">
                  {entity.communes.map((commune) => (
                    <article className="commune-card" key={commune.name}>
                      <h3>Commune de {commune.name}</h3>
                      <dl>
                        <dt>Bourgmestre</dt><dd>{showValue(commune.mayor)}</dd>
                        <dt>Bourgmestre adjoint</dt><dd>{showValue(commune.deputyMayor)}</dd>
                        <dt>Maison communale</dt><dd>{showValue(commune.address)}</dd>
                        <dt>Superficie</dt><dd>{showValue(commune.areaKm2, ' km²')}</dd>
                        <dt>Population estimée</dt><dd>{showValue(commune.populationEstimate)}</dd>
                      </dl>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <div className="territory-fact">
                <span>Services et entités locales</span>
                <strong>Secteurs et chefferies : à confirmer</strong>
              </div>
            )}

            <div className="audience-form__actions">
              <Link className="reference-button" href="/contact">Demander une information <span aria-hidden="true">→</span></Link>
              <Link className="underlined-link" href="/entites-territoriales">Retour à la vue d’ensemble</Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
