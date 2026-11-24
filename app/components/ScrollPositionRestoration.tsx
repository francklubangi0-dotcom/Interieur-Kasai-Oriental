'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const positionPrefix = 'nod-scroll-position:';
const pendingPathKey = 'nod-scroll-pending-path';

function readPosition(pathname: string) {
  try {
    const saved = window.sessionStorage.getItem(`${positionPrefix}${pathname}`);
    if (saved === null) return null;

    const position = Number(saved);
    return Number.isFinite(position) && position >= 0 ? position : null;
  } catch (error) {
    console.error('La position de défilement sauvegardée n’a pas pu être lue.', error);
    return null;
  }
}

function writePosition(pathname: string, position: number) {
  try {
    window.sessionStorage.setItem(`${positionPrefix}${pathname}`, String(Math.max(0, position)));
  } catch (error) {
    console.error('La position de défilement n’a pas pu être sauvegardée.', error);
  }
}

function restorePosition(pathname: string) {
  const position = readPosition(pathname);
  if (position === null) return;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => window.scrollTo({ top: position, behavior: 'auto' }));
  });
}

export default function ScrollPositionRestoration() {
  const pathname = usePathname();
  const pathnameRef = useRef(pathname);

  useEffect(() => {
    pathnameRef.current = pathname;

    try {
      const pendingPath = window.sessionStorage.getItem(pendingPathKey);
      if (!pendingPath) return;

      window.sessionStorage.removeItem(pendingPathKey);
      if (pendingPath === pathname) restorePosition(pathname);
    } catch (error) {
      console.error('La navigation de retour n’a pas pu être restaurée.', error);
    }
  }, [pathname]);

  useEffect(() => {
    let saveTimer: number | undefined;

    function saveCurrentPosition() {
      if (saveTimer !== undefined) window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(() => {
        saveTimer = undefined;
        writePosition(pathnameRef.current, window.scrollY);
      }, 100);
    }

    function flushCurrentPosition() {
      if (saveTimer !== undefined) {
        window.clearTimeout(saveTimer);
        saveTimer = undefined;
      }
      writePosition(pathnameRef.current, window.scrollY);
    }

    function markReturnPath(path: string) {
      try {
        window.sessionStorage.setItem(pendingPathKey, path);
      } catch (error) {
        console.error('La destination de retour n’a pas pu être mémorisée.', error);
      }
    }

    function handleClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      let destination: URL;
      try {
        destination = new URL(link.href, window.location.href);
      } catch (error) {
        console.error('Le lien de navigation contient une adresse invalide.', error);
        return;
      }
      if (destination.origin !== window.location.origin) return;
      flushCurrentPosition();

      if (link.hasAttribute('data-reset-scroll')) {
        writePosition(destination.pathname, 0);
        try {
          window.sessionStorage.removeItem(pendingPathKey);
        } catch (error) {
          console.error('La destination de retour précédente n’a pas pu être effacée.', error);
        }
        if (destination.pathname === pathnameRef.current) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (link.classList.contains('page-back-link')) {
        markReturnPath(destination.pathname);
      }
    }

    function handlePopState() {
      const destinationPath = window.location.pathname;
      markReturnPath(destinationPath);
      window.setTimeout(() => {
        if (window.location.pathname === pathnameRef.current) restorePosition(destinationPath);
      }, 80);
    }

    function saveBeforeLeaving() {
      flushCurrentPosition();
    }

    window.addEventListener('scroll', saveCurrentPosition, { passive: true });
    window.addEventListener('pagehide', saveBeforeLeaving);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleClick, true);

    return () => {
      window.removeEventListener('scroll', saveCurrentPosition);
      window.removeEventListener('pagehide', saveBeforeLeaving);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick, true);
      if (saveTimer !== undefined) window.clearTimeout(saveTimer);
    };
  }, []);

  return null;
}
