'use client';

import { useEffect, useState } from 'react';
import heroImage from '../../images/MIN.jpeg';
import consultationImage from '../../images/GOUV.jpeg';
import governorMeetingImage from '../../images/GOUV1.jpeg';
import { formatNewsDate, getLatestNews } from '../data/news';
import { useLiveNews } from './useLiveContent';

const storyImages: Record<string, string> = {
  '20-10-2026': heroImage.src,
  '07-10-2026': consultationImage.src,
  '25-10-2026': governorMeetingImage.src,
};

const initialStories = getLatestNews(3);

function Arrow() {
  return <span aria-hidden="true">→</span>;
}

export default function HomeHero() {
  const { items, error, loaded } = useLiveNews(getLatestNews(3));
  const carouselStories = items
    .filter((item) => item.carouselPosition !== null)
    .sort((left, right) => (left.carouselPosition ?? 0) - (right.carouselPosition ?? 0))
    .slice(0, 3);
  const stories = loaded
    ? carouselStories.length > 0
      ? carouselStories
      : items.slice(0, 3)
    : initialStories;
  const [activeStory, setActiveStory] = useState(0);
  const activeIndex = Math.min(activeStory, Math.max(stories.length - 1, 0));
  const story = stories[activeIndex];

  useEffect(() => {
    setActiveStory((current) => Math.min(current, Math.max(stories.length - 1, 0)));
  }, [stories.length]);

  useEffect(() => {
    if (stories.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveStory((current) => (current + 1) % stories.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [stories.length]);

  if (!story) {
    return (
      <section id="accueil" className="reference-hero">
        <div className="hero-overlay" />
        <div className="hero-shell">
          <div className="hero-copy">
            <span className="hero-kicker">INFORMATIONS OFFICIELLES</span>
            <h1>Aucune actualité publiée</h1>
            {error && <p className="cms-load-error" role="alert">{error}</p>}
          </div>
        </div>
      </section>
    );
  }

  const storyImage = story.imageUrl
    ?? storyImages[story.slug ?? story.id]
    ?? heroImage.src;

  function showPreviousStory() {
    setActiveStory((activeIndex - 1 + stories.length) % stories.length);
  }

  function showNextStory() {
    setActiveStory((activeIndex + 1) % stories.length);
  }

  return (
    <section id="accueil" className="reference-hero">
      <div className="hero-background" key={story.id} style={{ backgroundImage: `url("${storyImage}")` }} />
      <div className="hero-overlay" />
      <div className="hero-shell">
        <div className="hero-copy" key={story.id} aria-live="polite">
          <span className="hero-kicker">{story.category} / {formatNewsDate(story.date)}</span>
          <h1>{story.title}</h1>
          <p>{story.excerpt}</p>
          <a className="reference-button" href={`/actualites/article/${encodeURIComponent(story.slug ?? story.id)}`}>En savoir plus <Arrow /></a>
        </div>
        {error && <span className="sr-only" role="status">{error}</span>}
        <button className="hero-arrow hero-arrow--left" onClick={showPreviousStory} aria-label="Actualité précédente">‹</button>
        <button className="hero-arrow hero-arrow--right" onClick={showNextStory} aria-label="Actualité suivante">›</button>
        <div className="hero-dots" role="group" aria-label="Choisir une actualité">
          {stories.map((item, index) => (
            <button
              className={index === activeIndex ? 'active' : ''}
              key={item.id}
              onClick={() => setActiveStory(index)}
              aria-label={`Afficher l’actualité ${index + 1} sur ${stories.length}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
