'use client';

import { useState } from 'react';
import { provinceMapShapes } from '../data/provinceMapShapes';
import { territorialEntities } from '../data/territorialEntities';

const zones = territorialEntities.map((entity) => ({
  id: entity.slug,
  name: entity.name,
  type: entity.kind,
  subdivisions: entity.communes.map((commune) => commune.name),
  subdivisionLabel: entity.kind === 'Ville'
    ? `${entity.communes.length} communes de la ville`
    : 'Secteurs et chefferies à confirmer',
  administratorTitle: entity.administratorTitle,
  administrator: entity.administrator,
  administratorNote: entity.administratorNote,
  administratorSource: entity.administratorSource,
  contact: 'Contacts officiels à publier',
}));

const statistics = [
  { value: '01', label: 'Ville' },
  { value: '05', label: 'Territoires' },
  { value: '05', label: 'Communes de Mbuji-Mayi' },
  { value: 'À confirmer', label: 'Secteurs' },
  { value: 'À confirmer', label: 'Chefferies' },
  { value: 'À publier', label: 'Commissariats' },
];

export default function ProvinceExplorer() {
  const [activeId, setActiveId] = useState<string>(zones[0].id);
  const activeZone = zones.find((zone) => zone.id === activeId) ?? zones[0];

  return (
    <section id="explorer-province" className="province-explorer" aria-labelledby="province-title">
      <div className="page-shell province-explorer__inner">
        <header className="province-explorer__heading">
          <div>
            <span className="section-label">COUVERTURE ADMINISTRATIVE</span>
            <h2 id="province-title">Explorer le <strong>Kasaï Oriental.</strong></h2>
            <p>Une vue d’ensemble de la province, de ses entités et de son organisation territoriale.</p>
          </div>
          <span className="province-explorer__seal" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M5 8.5 12 5l8 3.5L27 5v18.5L20 27l-8-3.5L5 27V8.5Z" />
              <path d="M12 5v18.5M20 8.5V27" />
              <circle cx="16" cy="16" r="2" />
            </svg>
            <span>PROVINCE<br />DU KASAÏ ORIENTAL</span>
          </span>
        </header>

        <div className="province-stats" aria-label="Chiffres clés de la province">
          {statistics.map((statistic, index) => (
            <div className="province-stat" key={statistic.label}>
              <span className="province-stat__number">{statistic.value}</span>
              <span className="province-stat__label">{statistic.label}</span>
              <span className="province-stat__index">0{index + 1}</span>
            </div>
          ))}
        </div>

        <div className="province-workspace">
          <div className="province-map-card">
            <div className="province-map-card__heading">
              <div>
                <span className="province-map-card__eyebrow">CARTE INTERACTIVE</span>
                <h3>Sélectionnez une entité</h3>
              </div>
              <span className="province-map-card__north" aria-label="Nord">N ↑</span>
            </div>
            <div className="province-map-scroll">
              <svg className="province-map" viewBox="0 0 520 450" role="group" aria-label="Carte indicative et interactive des six entités du Kasaï Oriental">
                <defs>
                  <pattern id="province-map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                    <path d="M28 0H0V28" fill="none" stroke="#dce8e2" strokeWidth=".7" />
                  </pattern>
                  <filter id="province-map-shadow" x="-20%" y="-20%" width="140%" height="150%">
                    <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#183a2a" floodOpacity=".13" />
                  </filter>
                </defs>
                <rect x="4" y="4" width="512" height="442" rx="8" fill="url(#province-map-grid)" />
                {provinceMapShapes.map((shape) => (
                  <g
                    className={`province-map__zone ${shape.id === 'mbuji-mayi' ? 'is-city' : ''} ${activeId === shape.id ? 'is-selected' : ''}`}
                    key={shape.id}
                    role="button"
                    tabIndex={0}
                    aria-label={`Afficher ${zones.find((zone) => zone.id === shape.id)?.name}`}
                    aria-pressed={activeId === shape.id}
                    onMouseEnter={() => setActiveId(shape.id)}
                    onFocus={() => setActiveId(shape.id)}
                    onClick={() => setActiveId(shape.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setActiveId(shape.id);
                      }
                    }}
                  >
                    <path d={shape.path} fillRule="evenodd" filter={activeId === shape.id ? 'url(#province-map-shadow)' : undefined} />
                    <text x={shape.x} y={shape.y}>{shape.label}</text>
                    <circle cx={shape.x} cy={shape.y + 13} r="2.5" />
                  </g>
                ))}
                <text className="province-map__caption" x="22" y="435">LIMITES ADMINISTRATIVES INDICATIVES · DONNÉES 2019</text>
              </svg>
            </div>
            <div className="province-map-card__legend">
              <span><i /> Territoire</span>
              <span><i className="is-city" /> Ville</span>
              <span className="province-map-card__hint">Survolez ou sélectionnez une zone</span>
            </div>
          </div>

          <aside className="province-detail" aria-live="polite" aria-atomic="true">
            <span className="province-detail__index">FICHE DE L’ENTITÉ</span>
            <span className="province-detail__type">{activeZone.type}</span>
            <h3>{activeZone.name}</h3>
            <div className="province-detail__rule" />
            <dl className="province-detail__facts">
              <div>
                <dt>Subdivision</dt>
                <dd>{activeZone.subdivisionLabel}</dd>
              </div>
              <div>
                <dt>Autorité locale</dt>
                <dd>
                  {activeZone.administrator ?? activeZone.administratorTitle}
                  <span>{activeZone.administratorNote ?? 'Nom à confirmer par les services compétents'}</span>
                  {activeZone.administratorSource && (
                    <a href={activeZone.administratorSource} target="_blank" rel="noreferrer">Source publique de 2026</a>
                  )}
                </dd>
              </div>
              <div>
                <dt>Contacts d’urgence locaux</dt>
                <dd>{activeZone.contact}<span>En attendant, contactez les services provinciaux via le portail.</span></dd>
              </div>
            </dl>
            {activeZone.subdivisions.length > 0 && (
              <div className="province-detail__subdivisions">
                <span>COMMUNES DE MBUJI-MAYI · 5</span>
                <ul>
                  {activeZone.subdivisions.map((subdivision) => <li key={subdivision}>{subdivision}</li>)}
                </ul>
              </div>
            )}
            {activeZone.subdivisions.length === 0 && (
              <div className="province-detail__registry">
                <div>
                  <span>Secteurs</span>
                  <p>Répertoire officiel à publier</p>
                </div>
                <div>
                  <span>Chefferies</span>
                  <p>Répertoire officiel à publier</p>
                </div>
              </div>
            )}
            <a className="province-detail__link" href={`/entites-territoriales/${activeZone.id}`}>Fiche complète <span aria-hidden="true">→</span></a>
          </aside>
        </div>

        <p className="province-explorer__source">
          La liste des cinq territoires est présentée par le <a href="https://interieur.gouv.cd/ministere/territoires" target="_blank" rel="noreferrer">Ministère de l’Intérieur</a> ; Mbuji-Mayi compte cinq communes selon les listes consultées, à confirmer par registre officiel. Le total provincial des communes et les nombres de secteurs, chefferies et commissariats restent à confirmer. Contours 2019 : <a href="https://www.geoboundaries.org/" target="_blank" rel="noreferrer">OCHA / Référentiel Géographique Commun, via geoBoundaries</a> (CC BY 3.0 IGO). Les limites, répertoires et contacts sont indicatifs.
        </p>
      </div>
    </section>
  );
}
