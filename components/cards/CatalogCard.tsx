import type { PokemonCard } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { useCollection } from '@/contexts/CollectionContext';
import { getMarketPrice } from '@/utils/pricing';

interface CatalogCardProps {
  card: PokemonCard;
  onAdd: (card: PokemonCard) => void;
}

export const CatalogCard = ({ card, onAdd }: CatalogCardProps) => {
  const { t, formatCurrency } = useLocalization();
  const { getQuantity } = useCollection();
  const quantity = getQuantity(card.id);
  const price = getMarketPrice(card);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-poke-blue/5 transition hover:-translate-y-1 hover:shadow-poke-blue/20 dark:border-gray-800 dark:bg-gray-900">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-poke-blue/10 via-transparent to-poke-yellow/10">
        <img
          src={card.images?.small}
          alt={card.name}
          loading="lazy"
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <header>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{card.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{card.set?.name}</p>
        </header>
        <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400">
          {card.types?.map((type) => (
            <span key={type} className="rounded-full bg-poke-blue/10 px-2 py-1 text-poke-blue dark:bg-poke-yellow/10 dark:text-poke-yellow">
              {type}
            </span>
          ))}
          {card.rarity && (
            <span className="rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800">{card.rarity}</span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('marketPrice')}</p>
            <p className="text-lg font-bold text-poke-blue dark:text-poke-yellow">
              {price ? formatCurrency(price) : t('priceNotAvailable')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAdd(card)}
            className="rounded-full bg-poke-blue px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-poke-blue/20 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-poke-blue/60 dark:bg-poke-yellow dark:text-gray-900"
          >
            {quantity ? `${t('addToCollection')} (${quantity})` : t('addToCollection')}
          </button>
        </div>
      </div>
    </article>
  );
};
