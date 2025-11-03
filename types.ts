export interface Attack {
  name: string;
  cost: string[];
  damage?: string;
  text?: string;
}

export interface PriceDetail {
  low?: number;
  mid?: number;
  high?: number;
  market?: number;
  directLow?: number | null;
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype?: string;
  subtypes?: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    url?: string;
    updatedAt?: string;
    prices?: Record<string, PriceDetail | undefined>;
  };
  set?: {
    id: string;
    name: string;
    series?: string;
    printedTotal?: number;
    total?: number;
    images?: {
      symbol: string;
      logo: string;
    };
  };
  rarity?: string;
  attacks?: Attack[];
}

export interface CardSet {
  id: string;
  name: string;
  series: string;
}

export interface CollectionItem extends PokemonCard {
  addedDate: string;
  quantity: number;
}

export type Locale = 'en' | 'cs' | 'sk' | 'jp';

export interface LocaleConfig {
  currency: 'USD' | 'CZK' | 'EUR' | 'JPY';
  symbol: '$' | 'Kč' | '€' | '¥';
  rate: number;
  name: string;
}
