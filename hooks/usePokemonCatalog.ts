import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchCards, fetchRarities, fetchSets, fetchTypes, type CardSearchParams } from '@/services/pokemonService';
import type { PokemonCard } from '@/types';

export interface CatalogFilters {
  searchTerm: string;
  setId: string;
  rarity: string;
  type: string;
  page: number;
}

interface UsePokemonCatalogResult {
  cards: PokemonCard[];
  isLoading: boolean;
  isFiltersLoading: boolean;
  error: string | null;
  totalCount: number;
  filters: CatalogFilters;
  availableSets: { id: string; name: string }[];
  rarities: string[];
  types: string[];
  updateFilters: (next: Partial<CatalogFilters>) => void;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: CatalogFilters = {
  searchTerm: '',
  setId: '',
  rarity: '',
  type: '',
  page: 1,
};

export const usePokemonCatalog = (pageSize = 20): UsePokemonCatalogResult => {
  const [cards, setCards] = useState<PokemonCard[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState<CatalogFilters>({ ...DEFAULT_FILTERS });
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltersLoading, setIsFiltersLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableSets, setAvailableSets] = useState<{ id: string; name: string }[]>([]);
  const [rarities, setRarities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const updateFilters = useCallback((next: Partial<CatalogFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...next,
      page: next.page ?? (next.searchTerm !== undefined || next.setId !== undefined || next.rarity !== undefined || next.type !== undefined ? 1 : prev.page),
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS });
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsFiltersLoading(true);

    Promise.all([fetchSets(), fetchRarities(), fetchTypes()])
      .then(([setsData, raritiesData, typesData]) => {
        if (!isMounted) {
          return;
        }

        setAvailableSets(setsData);
        setRarities(raritiesData);
        setTypes(typesData);
      })
      .catch((cause: unknown) => {
        if (!isMounted) {
          return;
        }
        setError(cause instanceof Error ? cause.message : String(cause));
      })
      .finally(() => {
        if (isMounted) {
          setIsFiltersLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const params: CardSearchParams = {
      name: filters.searchTerm,
      setId: filters.setId || undefined,
      rarity: filters.rarity || undefined,
      type: filters.type || undefined,
      page: filters.page,
      pageSize,
    };

    fetchCards(params)
      .then(({ data, totalCount: count }) => {
        if (!isMounted) {
          return;
        }
        setCards(data);
        setTotalCount(count);
      })
      .catch((cause: unknown) => {
        if (!isMounted) {
          return;
        }
        setError(cause instanceof Error ? cause.message : String(cause));
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [filters, pageSize]);

  return useMemo(() => ({
    cards,
    isLoading,
    isFiltersLoading,
    error,
    totalCount,
    filters,
    availableSets,
    rarities,
    types,
    updateFilters,
    resetFilters,
  }), [cards, isLoading, isFiltersLoading, error, totalCount, filters, availableSets, rarities, types, updateFilters, resetFilters]);
};
