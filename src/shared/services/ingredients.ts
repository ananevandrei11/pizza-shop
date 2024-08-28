import { Ingredient } from '@prisma/client';
import { AXIOS } from './instances';
import { ApiRoutes } from './constants';

export const getAll = async () => {
  const { data } = await AXIOS.get<Ingredient[]>(ApiRoutes.GET_ALL_INGREDIENTS);
  return data;
};
