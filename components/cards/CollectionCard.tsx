import type { PokemonCard } from '@/types';
import { useLocalization } from '@/contexts/LocalizationContext';
import { getMarketPrice } from '@/utils/pricing';

interface CollectionCardProps {
  card: PokemonCard & { quantity: number };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export const CollectionCard = ({ card, onIncrement, onDecrement, onRemove }: CollectionCardProps) => {
  const { t, formatCurrency } = useLocalization();
  const price = getMarketPrice(card);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4">
        <img src={card.images?.small} alt={card.name} loading="lazy" className="h-24 w-24 rounded-xl bg-gray-50 object-contain p-2 dark:bg-gray-800" />
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{card.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{card.set?.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('marketPrice')}: <span className="font-semibold text-poke-blue dark:text-poke-yellow">{price ? formatCurrency(price) : t('priceNotAvailable')}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onDecrement}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-lg font-semibold text-gray-700 transition hover:bg-gray-200 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="text-xl font-bold">{card.quantity}</span>
          <button
            type="button"
            onClick={onIncrement}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-poke-blue text-lg font-semibold text-white shadow shadow-poke-blue/30 transition hover:brightness-110 dark:bg-poke-yellow dark:text-gray-900"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <div className="flex flex-col items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <p>
            {t('collectionValue')}: <span className="font-semibold text-poke-blue dark:text-poke-yellow">{price ? formatCurrency(price * card.quantity) : t('priceNotAvailable')}</span>
          </p>
          <button
            type="button"
            onClick={onRemove}
            className="text-sm font-semibold text-red-500 transition hover:text-red-600"
          >
            {t('removeFromCollection')}
          </button>
        </div>
      </div>
    </article>
  );
};
