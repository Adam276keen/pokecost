import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CollectionItem, PokemonCard } from '@/types';
import { getMarketPrice } from '@/utils/pricing';

interface CollectionContextValue {
  collection: CollectionItem[];
  addCard: (card: PokemonCard) => void;
  decrementCard: (cardId: string) => void;
  removeCard: (cardId: string) => void;
  getQuantity: (cardId: string) => number;
  getTotalValue: () => number;
}

const STORAGE_KEY = 'pokecost-collection';

const CollectionContext = createContext<CollectionContextValue | undefined>(undefined);

const parseStoredCollection = (): CollectionItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as CollectionItem[];
  } catch (error) {
    console.warn('Failed to parse collection from storage', error);
    return [];
  }
};

export const CollectionProvider = ({ children }: { children: ReactNode }) => {
  const [collection, setCollection] = useState<CollectionItem[]>(parseStoredCollection);

  const updateCollection = useCallback((updater: (previous: CollectionItem[]) => CollectionItem[]) => {
    setCollection((previous) => {
      const next = updater(previous);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });
  }, []);

  const addCard = useCallback((card: PokemonCard) => {
    updateCollection((prev) => {
      const existing = prev.find((item) => item.id === card.id);
      if (existing) {
        return prev.map((item) =>
          item.id === card.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...prev,
        {
          ...card,
          quantity: 1,
          addedDate: new Date().toISOString(),
        },
      ];
    });
  }, [updateCollection]);

  const decrementCard = useCallback((cardId: string) => {
    updateCollection((prev) => {
      const existing = prev.find((item) => item.id === cardId);
      if (!existing) {
        return prev;
      }

      if (existing.quantity <= 1) {
        return prev.filter((item) => item.id !== cardId);
      }

      return prev.map((item) =>
        item.id === cardId ? { ...item, quantity: item.quantity - 1 } : item,
      );
    });
  }, [updateCollection]);

  const removeCard = useCallback((cardId: string) => {
    updateCollection((prev) => prev.filter((item) => item.id !== cardId));
  }, [updateCollection]);

  const getQuantity = useCallback((cardId: string) => {
    return collection.find((item) => item.id === cardId)?.quantity ?? 0;
  }, [collection]);

  const getTotalValue = useCallback(() => {
    return collection.reduce((sum, item) => {
      const price = getMarketPrice(item);
      if (!price) {
        return sum;
      }

      return sum + price * item.quantity;
    }, 0);
  }, [collection]);

  const value = useMemo<CollectionContextValue>(() => ({
    collection,
    addCard,
    decrementCard,
    removeCard,
    getQuantity,
    getTotalValue,
  }), [collection, addCard, decrementCard, removeCard, getQuantity, getTotalValue]);

  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>;
};

export const useCollection = (): CollectionContextValue => {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }

  return context;
};
