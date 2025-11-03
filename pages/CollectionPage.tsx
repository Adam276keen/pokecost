import { CollectionCard } from '@/components/cards/CollectionCard';
import { useCollection } from '@/contexts/CollectionContext';
import { useLocalization } from '@/contexts/LocalizationContext';

export const CollectionPage = () => {
  const { collection, addCard, decrementCard, removeCard, getTotalValue } = useCollection();
  const { t, formatCurrency } = useLocalization();

  const totalValue = getTotalValue();

  return (
    <section className="flex flex-col gap-6">
      <header className="rounded-3xl bg-gradient-to-r from-poke-yellow via-poke-yellow/80 to-poke-blue/80 p-6 text-gray-900 shadow-xl dark:text-gray-900">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{t('myCollection')}</h1>
        <p className="mt-2 text-gray-800">
          {t('collectionValue')}: <span className="font-semibold">{formatCurrency(totalValue)}</span>
        </p>
      </header>

      {collection.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-lg font-semibold">{t('emptyCollection')}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {collection.map((card) => (
            <CollectionCard
              key={card.id}
              card={card}
              onIncrement={() => addCard(card)}
              onDecrement={() => decrementCard(card.id)}
              onRemove={() => removeCard(card.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
