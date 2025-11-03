import type { PokemonCard } from '@/types';

export const getMarketPrice = (card: PokemonCard): number | undefined => {
  const prices = card.tcgplayer?.prices;
  if (!prices) {
    return undefined;
  }

  for (const value of Object.values(prices)) {
    if (value?.market) {
      return value.market;
    }
  }

  return undefined;
};
