import { Product } from '@prisma/client';
import { AXIOS } from './instances';
import { ApiRoutes } from './constants';

export const search = async (query: string) => {
  const { data } = await AXIOS.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { q: query },
  });
  return data;
};
