'use client';

import { useState } from 'react';
import heroImage from '../../images/MIN.jpeg';

const stories = [
  {
    date: '20 OCTOBRE 2026',
    category: 'ACTUALITÉ',
    title: "LE MINISTRE PROVINCIAL DE L'INTÉRIEUR ASSURE L'INTÉRIM DU GOUVERNEUR",
    description: "En l'absence du gouverneur et du vice-gouverneur, Me Patrick Mukendi Makanda est appelé à assurer l'intérim à la tête de la province du Kasaï Oriental.",
  },
  {
    date: '07 OCTOBRE 2026',
    category: 'ACTUALITÉ',
    title: 'CONSULTATIONS ET IDENTIFICATION DES CONFLITS COUTUMIERS DANS LA CHEFFERIE DE BAKWA KALONJI',
    description: 'La séance est présidée par le gouverneur de province.',
  },
  {
    date: '29 SEPTEMBRE 2026',
    category: 'INSTITUTION',
    title: 'LE MINISTRE ÉCHANGE AVEC LES ACTEURS DE TERRAIN',
    description: 'Un dialogue régulier pour faire remonter les besoins et accélérer les réponses au service de la population.',
  },
];

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function HomeHero() {
  const [activeStory, setActiveStory] = useState(0);
  const story = stories[activeStory];

  function showPreviousStory() {
    setActiveStory((current) => (current - 1 + stories.length) % stories.length);
  }

  function showNextStory() {
    setActiveStory((current) => (current + 1) % stories.length);
  }

  return (
    <section id="accueil" className="reference-hero">
      <div className="hero-background" style={{ backgroundImage: `url("${heroImage.src}")` }} />
      <div className="hero-overlay" />
      <div className="hero-shell">
        <div className="hero-copy" aria-live="polite">
          <span className="hero-kicker">{story.category} / {story.date}</span>
          <h1>{story.title}</h1>
          <p>{story.description}</p>
          <a className="reference-button" href="#actualites">En savoir plus <Arrow /></a>
        </div>
        <button className="hero-arrow hero-arrow--left" onClick={showPreviousStory} aria-label="Actualité précédente">‹</button>
        <button className="hero-arrow hero-arrow--right" onClick={showNextStory} aria-label="Actualité suivante">›</button>
        <div className="hero-dots" role="group" aria-label="Choisir une actualité">
          {stories.map((item, index) => (
            <button
              className={index === activeStory ? 'active' : ''}
              key={item.date}
              onClick={() => setActiveStory(index)}
              aria-label={`Afficher l’actualité ${index + 1} sur ${stories.length}`}
              aria-current={index === activeStory ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
      <a className="event-card" href="#agenda"><span>ÉVÉNEMENT / 8 SEPTEMBRE 2027</span><strong>Journée mondiale de la physiothérapie</strong><Arrow /></a>
    </section>
  );
}
