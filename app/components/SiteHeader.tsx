'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UrgentTicker from './UrgentTicker';
import logo from '../../images/rijec-logo-wide.png';

type MenuLink = { label: string; href: string };

function NavigationDropdown({
  id,
  label,
  active,
  items,
  onNavigate,
}: {
  id: string;
  label: string;
  active: boolean;
  items: MenuLink[];
  onNavigate: () => void;
}) {
  return (
    <details
      className={`nav-dropdown ${active ? 'is-active' : ''}`}
      onMouseEnter={(event) => {
        if (window.matchMedia('(hover: hover)').matches) event.currentTarget.open = true;
      }}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement)) event.currentTarget.open = false;
      }}
      onBlur={(event) => {
        const nextTarget = event.relatedTarget;
        if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) event.currentTarget.open = false;
      }}
    >
      <summary className="nav-dropdown__trigger" aria-controls={`nav-menu-${id}`}>
        {label}
        <span className="nav-dropdown__chevron" aria-hidden="true">
          <svg viewBox="0 0 12 8" focusable="false"><path d="m1.5 1.5 4.5 5 4.5-5" /></svg>
        </span>
      </summary>
      <div id={`nav-menu-${id}`} className="nav-dropdown__menu">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={(event) => {
              const details = event.currentTarget.closest('details');
              if (details) details.open = false;
              onNavigate();
            }}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

const ministryLinks: MenuLink[] = [
  { label: 'Présentation du Ministère', href: '/#ministere' },
  { label: 'Le Ministre', href: '/ministre' },
  { label: 'Le Cabinet', href: '/cabinet' },
  { label: 'Nos Missions et Attributions', href: '/missions' },
];

const territorialLinks: MenuLink[] = [
  { label: 'Vue d’ensemble', href: '/entites-territoriales' },
  { label: 'Ville de Mbuji-Mayi', href: '/entites-territoriales/mbuji-mayi' },
  { label: 'Territoire de Kabeya-Kamwanga', href: '/entites-territoriales/kabeya-kamwanga' },
  { label: 'Territoire de Katanda', href: '/entites-territoriales/katanda' },
  { label: 'Territoire de Lupatapata', href: '/entites-territoriales/lupatapata' },
  { label: 'Territoire de Miabi', href: '/entites-territoriales/miabi' },
  { label: 'Territoire de Tshilenge', href: '/entites-territoriales/tshilenge' },
];

const serviceLinks: MenuLink[] = [
  { label: 'Démarches et services aux citoyens', href: '/services-publics' },
  { label: 'Demander une audience', href: '/services-publics/demander-audience' },
  { label: 'Suivre une demande', href: '/services-publics/suivi-audience' },
];

export default function SiteHeader({
  activeItem = 'ACCUEIL',
  showUrgentTicker = false,
}: {
  activeItem?: string;
  showUrgentTicker?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  function returnToHome() {
    closeMenu();
    if (window.location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
        <Link className="reference-logo reference-logo--header" href="/" data-reset-scroll onClick={returnToHome} aria-label="Ministère de l’Intérieur du Kasaï-Oriental, accueil">
          <Image src={logo} alt="Ministère de l’Intérieur, Sécurité, Décentralisation et Affaires coutumières du Kasaï-Oriental" priority />
        </Link>
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
          <button className="reference-menu-button" type="button" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="reference-nav">
            <span className="sr-only">{menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}</span><i /><i /><i />
          </button>
        </div>
        <nav id="reference-nav" className={`reference-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Menu principal">
          <Link className={activeItem === 'ACCUEIL' ? 'active' : ''} href="/" data-reset-scroll onClick={returnToHome}>ACCUEIL</Link>
          <NavigationDropdown
            id="ministry"
            label="LE MINISTÈRE"
            active={activeItem === 'LE MINISTÈRE'}
            items={ministryLinks}
            onNavigate={closeMenu}
          />
          <NavigationDropdown
            id="territories"
            label="ENTITÉS TERRITORIALES"
            active={activeItem === 'ENTITÉS TERRITORIALES'}
            items={territorialLinks}
            onNavigate={closeMenu}
          />
          <NavigationDropdown
            id="services"
            label="SERVICES AU PUBLIC"
            active={activeItem === 'SERVICES AU PUBLIC'}
            items={serviceLinks}
            onNavigate={closeMenu}
          />
          <Link className={activeItem === 'ACTUALITÉS' ? 'active' : ''} href="/actualites" onClick={closeMenu}>ACTUALITÉS</Link>
          <Link className={activeItem === 'PUBLICATIONS' ? 'active' : ''} href="/#publications" onClick={closeMenu}>PUBLICATIONS</Link>
          <Link className={activeItem === 'CONTACT' ? 'active' : ''} href="/contact" onClick={closeMenu}>CONTACT</Link>
          <Link className="nav-report-button" href="/signaler" onClick={closeMenu}>Signaler une préoccupation</Link>
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
      {showUrgentTicker && <UrgentTicker />}
    </header>
  );
}
