"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "techsaashub:favorite-tools";

function readStoredFavorites(): string[] {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Favorites persisted to localStorage. There's no public user-account system
 * on this site (only admin auth), so per-device local storage is the honest,
 * correctly-scoped mechanism here rather than a fake "sign in to save" flow.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setFavorites(readStoredFavorites());
    setHydrated(true);
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((previous) => {
      const next = previous.includes(slug)
        ? previous.filter((existing) => existing !== slug)
        : [...previous, slug];
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage unavailable (private browsing, storage full, etc.) —
        // the toggle still updates in-memory state for this session.
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((slug: string) => favorites.includes(slug), [favorites]);

  return { favorites, toggleFavorite, isFavorite, hydrated };
}
