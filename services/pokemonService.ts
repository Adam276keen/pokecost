import { API_BASE_URL, API_KEY } from '@/constants';
import type { PokemonCard } from '@/types';

export type FetchResult<T> = {
  data: T;
};

export type PaginatedResponse<T> = {
  data: T;
  totalCount: number;
};

export interface CardSearchParams {
  name?: string;
  setId?: string;
  rarity?: string;
  type?: string;
  page?: number;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 20;

const createHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'X-Api-Key': API_KEY,
});

const buildUrl = (endpoint: string, params: Record<string, string | number | undefined> = {}) => {
  const url = new URL(endpoint, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') {
      return;
    }
    url.searchParams.append(key, String(value));
  });
  return url.toString();
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  return response.json() as Promise<T>;
};

export const fetchCards = async (params: CardSearchParams = {}): Promise<PaginatedResponse<PokemonCard[]>> => {
  const { name, setId, rarity, type, page = 1, pageSize = DEFAULT_PAGE_SIZE } = params;

  const filters: string[] = [];
  if (name) {
    filters.push(`name:*${name}*`);
  }
  if (setId) {
    filters.push(`set.id:${setId}`);
  }
  if (rarity) {
    filters.push(`rarity:"${rarity}"`);
  }
  if (type) {
    filters.push(`types:"${type}"`);
  }

  const searchParams: Record<string, string | number> = {
    page,
    pageSize,
    orderBy: 'set.releaseDate desc',
  };

  if (filters.length) {
    searchParams.q = filters.join(' ');
  }

  const url = buildUrl('/cards', searchParams);

  const response = await fetch(url, {
    headers: createHeaders(),
  });

  const payload = await handleResponse<FetchResult<PokemonCard[]>>(response);
  const totalCount = Number(response.headers.get('X-Total-Count') ?? payload.data.length);

  return { data: payload.data, totalCount };
};

export const fetchSets = async () => {
  const url = buildUrl('/sets', { orderBy: 'releaseDate' });
  const response = await fetch(url, { headers: createHeaders() });
  const payload = await handleResponse<FetchResult<{ id: string; name: string }[]>>(response);
  return payload.data;
};

export const fetchRarities = async () => {
  const url = buildUrl('/rarities');
  const response = await fetch(url, { headers: createHeaders() });
  const payload = await handleResponse<FetchResult<string[]>>(response);
  return payload.data;
};

export const fetchTypes = async () => {
  const url = buildUrl('/types');
  const response = await fetch(url, { headers: createHeaders() });
  const payload = await handleResponse<FetchResult<string[]>>(response);
  return payload.data;
};
