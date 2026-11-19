'use client';

import { useState } from 'react';
import Image from 'next/image';
import logo from '../../images/RIJEC DESIGN (11).png';

const menuItems = [
  ['ATTRIBUTIONS', '/missions'],
  ['SERVICES AU PUBLIC', '/#services'],
  ['ACTUALITÉS', '/#actualites'],
  ['PUBLICATIONS', '/#publications'],
  ['CONTACT', '/contact'],
];

export default function SiteHeader({ activeItem = 'ACCUEIL' }: { activeItem?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function runSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;

    window.location.assign(`/recherche?q=${encodeURIComponent(query)}`);
  }

  function toggleSearch() {
    setSearchOpen((open) => !open);
  }

  return (
    <header className="reference-header">
      <div className="header-shell">
        <a className="reference-logo reference-logo--header" href="/#accueil" aria-label="Ministère de l’Intérieur du Kasaï-Oriental, accueil">
          <Image src={logo} alt="Ministère de l’Intérieur, Sécurité, Décentralisation et Affaires coutumières du Kasaï-Oriental" priority />
        </a>
        <div className="header-actions">
          <button
            className="header-search-toggle"
            type="button"
            aria-label={searchOpen ? 'Fermer la recherche' : 'Ouvrir la recherche'}
            aria-expanded={searchOpen}
            onClick={toggleSearch}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.2 15.2 21 21" />
            </svg>
          </button>
          <button className="reference-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="reference-nav">
            <span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span><i /><i /><i />
          </button>
        </div>
        <nav id="reference-nav" className={`reference-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Menu principal">
          <a className={activeItem === 'ACCUEIL' ? 'active' : ''} href="/#accueil" onClick={closeMenu}>ACCUEIL</a>
          <div className={`nav-dropdown ${activeItem === 'LE MINISTÈRE' ? 'is-active' : ''}`}>
            <a className="nav-dropdown__trigger" href="/#ministere" onClick={closeMenu}>LE MINISTÈRE</a>
            <div className="nav-dropdown__menu">
              <a href="/ministre" onClick={closeMenu}>Le Ministre</a>
              <a href="/cabinet" onClick={closeMenu}>Le Cabinet</a>
              <a href="/missions" onClick={closeMenu}>Nos missions</a>
            </div>
          </div>
          {menuItems.map(([label, href]) => (
            <a className={activeItem === label ? 'active' : ''} key={label} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <a className="nav-report-button" href="/signaler" onClick={closeMenu}>Signaler une préoccupation</a>
        </nav>
        <form className={`header-search ${searchOpen ? 'is-open' : ''}`} role="search" onSubmit={runSearch}>
          <label className="sr-only" htmlFor="site-search">Rechercher sur le site</label>
          <input id="site-search" type="search" required value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Rechercher" />
          <button type="submit" aria-label="Lancer la recherche">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.2 15.2 21 21" />
            </svg>
          </button>
        </form>
        <button className="language-switch" type="button" aria-label="Choisir la langue">FR ▾</button>
      </div>
    </header>
  );
}
