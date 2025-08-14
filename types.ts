export interface Attack {
  name: string;
  cost: string[];
  damage: string;
  text: string;
}

export interface PokemonCard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolvesFrom?: string;
  images: {
    small: string;
    large: string;
  };
  tcgplayer?: {
    url: string;
    updatedAt: string;
    prices: TCGPlayerPrices;
  };
  set: {
    id:string;
    name: string;
    series: string;
    printedTotal: number;
    total: number;
    images: {
      symbol: string;
      logo: string;
    };
  };
  rarity?: string;
  attacks?: Attack[];
}

export interface TCGPlayerPrices {
  normal?: PriceDetail;
  holofoil?: PriceDetail;
  reverseHolofoil?: PriceDetail;
  '1stEditionHolofoil'?: PriceDetail;
  '1stEditionNormal'?: PriceDetail;
}

export interface PriceDetail {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number | null;
}

export interface CardSet {
  id: string;
  name: string;
  series: string;
}

export interface User {
  uid: string;
  email: string | null;
}

export interface CollectionItem extends PokemonCard {
  addedDate: string;
  quantity: number;
}

export type Locale = 'en' | 'cs' | 'sk' | 'jp';
export type Region = 'intl' | 'jp';

export interface LocaleConfig {
  currency: 'USD' | 'CZK' | 'EUR' | 'JPY';
  symbol: '$' | 'Kč' | '€' | '¥';
  rate: number;
  name: string;
}

export interface TcgDexCardDetails {
  id: string;
  name: string;
  image?: string;
  hp?: number;
  types?: string[];
  category: string;
  rarity: string;
  set: {
    name: string;
    logo?: string;
  }
  attacks?: Attack[];
}