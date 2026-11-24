'use client';

import { useEffect, useState } from 'react';
import type { NewsItem } from '../data/news';
import type { UrgentNotice } from '../data/urgentNotices';
import {
  loadPublishedNews,
  loadPublishedUrgentNotices,
  subscribeToCmsTable,
} from '../data/supabase';

export function useLiveNews(initialItems: NewsItem[]) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const latestItems = await loadPublishedNews();
        if (active && latestItems !== null) {
          setItems(latestItems);
          setError(null);
          setLoaded(true);
        }
      } catch (loadError) {
        console.error('Impossible de charger les actualités publiées.', loadError);
        if (active) setError('La mise à jour des actualités a échoué. Les données affichées peuvent être obsolètes.');
      }
    }

    void refresh();
    const unsubscribe = subscribeToCmsTable('news_articles', () => void refresh());
    const intervalId = window.setInterval(() => void refresh(), 1_800_000);

    return () => {
      active = false;
      unsubscribe();
      window.clearInterval(intervalId);
    };
  }, []);

  return { items, error, loaded };
}

export function useLiveUrgentNotices(initialItems: UrgentNotice[]) {
  const [items, setItems] = useState(initialItems);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const latestItems = await loadPublishedUrgentNotices();
        if (active && latestItems !== null) {
          setItems(latestItems);
          setError(null);
        }
      } catch (loadError) {
        console.error('Impossible de charger les avis urgents publiés.', loadError);
        if (active) setError('La mise à jour des avis urgents a échoué. Les données affichées peuvent être obsolètes.');
      }
    }

    void refresh();
    const unsubscribe = subscribeToCmsTable('urgent_notices', () => void refresh());
    const intervalId = window.setInterval(() => void refresh(), 60_000);

    return () => {
      active = false;
      unsubscribe();
      window.clearInterval(intervalId);
    };
  }, []);

  return { items, error };
}
