'use client';

import { useEffect, useState } from 'react';
import SiteFooter from '../components/SiteFooter';
import SiteHeader from '../components/SiteHeader';

const pages = [
  { path: '/', title: 'Accueil' },
  { path: '/missions', title: 'Attributions et missions' },
  { path: '/ministre', title: 'Le Ministre' },
  { path: '/cabinet', title: 'Le Cabinet' },
  { path: '/contact', title: 'Contact' },
  { path: '/signaler', title: 'Signaler une préoccupation' },
];

type SearchResult = {
  href: string;
  title: string;
  excerpt: string;
};

type SearchStatus = 'loading' | 'done' | 'empty' | 'error';

function normalizeText(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

async function findPageResult(page: (typeof pages)[number], terms: string[]): Promise<SearchResult | null> {
  const response = await fetch(page.path);
  if (!response.ok) {
    throw new Error(`Impossible de consulter la page ${page.title}.`);
  }

  const html = await response.text();
  const pageDocument = new DOMParser().parseFromString(html, 'text/html');
  const main = pageDocument.querySelector('main');
  if (!main) {
    throw new Error(`Le contenu de la page ${page.title} est indisponible.`);
  }

  main.querySelectorAll('script, style, noscript').forEach((element) => element.remove());
  const pageText = normalizeText(`${page.title} ${main.textContent || ''}`);
  if (!terms.every((term) => pageText.includes(term))) {
    return null;
  }

  const textElements = Array.from(main.querySelectorAll<HTMLElement>('h1, h2, h3, p, blockquote, li'));
  const matchedElement = textElements.find((element) => {
    const text = normalizeText(element.textContent || '');
    return terms.every((term) => text.includes(term));
  }) ?? textElements.find((element) => normalizeText(element.textContent || '').includes(terms[0]));
  const article = matchedElement?.closest('article');
  const section = matchedElement?.closest('section[id], aside[id]');
  const titleElement = article?.querySelector('h1, h2, h3')
    ?? section?.querySelector('h1, h2, h3')
    ?? matchedElement?.closest('h1, h2, h3');
  const excerptElement = article?.querySelector('p')
    ?? (matchedElement?.matches('p, blockquote') ? matchedElement : null)
    ?? section?.querySelector('p')
    ?? matchedElement;
  const anchorTarget = article?.id || section?.id;

  return {
    href: anchorTarget ? `${page.path}#${anchorTarget}` : page.path,
    title: titleElement?.textContent?.trim() || page.title,
    excerpt: excerptElement?.textContent?.trim() || page.title,
  };
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<SearchStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const searchQuery = new URLSearchParams(window.location.search).get('q')?.trim() || '';
    setQuery(searchQuery);
    if (!searchQuery) {
      setStatus('empty');
      return;
    }

    let active = true;
    const terms = normalizeText(searchQuery).split(/\s+/).filter(Boolean);

    async function searchSite() {
      try {
        const pageResults = await Promise.all(pages.map((page) => findPageResult(page, terms)));
        if (!active) return;
        setResults(pageResults.filter((result): result is SearchResult => result !== null));
        setStatus('done');
      } catch (error) {
        if (!active) return;
        setErrorMessage(error instanceof Error ? error.message : 'Une erreur inconnue a interrompu la recherche.');
        setStatus('error');
      }
    }

    void searchSite();
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main className="search-page">
        <div className="page-shell search-page__inner">
          <span className="section-label">RECHERCHE SUR LE SITE</span>
          <h1>Résultats de recherche</h1>
          {query && <p className="search-page__query">Recherche : <strong>{query}</strong></p>}
          {status === 'loading' && <p role="status">Recherche en cours…</p>}
          {status === 'empty' && <p role="status">Saisissez un terme dans la barre de recherche pour consulter les pages du site.</p>}
          {status === 'error' && <p className="search-page__error" role="alert">{errorMessage}</p>}
          {status === 'done' && results.length === 0 && (
            <p role="status">Aucun résultat trouvé. Essayez un autre mot ou une expression plus courte.</p>
          )}
          {status === 'done' && results.length > 0 && (
            <div className="search-results" aria-live="polite">
              <p>{results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}.</p>
              {results.map((result) => (
                <article className="search-result" key={`${result.href}-${result.title}`}>
                  <h2><a href={result.href}>{result.title}</a></h2>
                  <p>{result.excerpt}</p>
                  <a className="search-result__link" href={result.href}>Consulter <span aria-hidden="true">→</span></a>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
