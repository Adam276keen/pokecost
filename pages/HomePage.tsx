import { useMemo } from 'react';
import { CardFilters } from '@/components/cards/CardFilters';
import { CardGrid } from '@/components/cards/CardGrid';
import { CatalogCard } from '@/components/cards/CatalogCard';
import { useCollection } from '@/contexts/CollectionContext';
import { useLocalization } from '@/contexts/LocalizationContext';
import { usePokemonCatalog } from '@/hooks/usePokemonCatalog';

export const HomePage = () => {
  const { t } = useLocalization();
  const { addCard } = useCollection();
  const {
    cards,
    filters,
    isLoading,
    isFiltersLoading,
    availableSets,
    rarities,
    types,
    updateFilters,
    resetFilters,
    error,
    totalCount,
  } = usePokemonCatalog();

  const hasResults = cards.length > 0;

  const subtitle = useMemo(() => {
    if (error) {
      return error;
    }

    if (isLoading) {
      return t('loading');
    }

    if (!hasResults) {
      return t('noCardsFound');
    }

    return `${totalCount.toLocaleString()} ${t('cardsFound')}`;
  }, [error, isLoading, hasResults, totalCount, t]);

  return (
    <section className="flex flex-col gap-6">
      <header className="rounded-3xl bg-gradient-to-r from-poke-blue via-poke-blue/80 to-poke-yellow/80 p-6 text-white shadow-xl">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t('title')}</h1>
        <p className="mt-2 text-white/80">{subtitle}</p>
      </header>

      <CardFilters
        filters={filters}
        availableSets={availableSets}
        rarities={rarities}
        types={types}
        onFiltersChange={updateFilters}
        onReset={resetFilters}
        isLoading={isFiltersLoading}
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
          {error}
        </div>
      )}

      {isLoading && !hasResults ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : hasResults ? (
        <CardGrid>
          {cards.map((card) => (
            <CatalogCard key={card.id} card={card} onAdd={addCard} />
          ))}
        </CardGrid>
      ) : (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-lg font-semibold">{t('noCardsFound')}</p>
          <p className="mt-2 text-sm">{t('filterBySet')}</p>
        </div>
      )}
    </section>
  );
};
