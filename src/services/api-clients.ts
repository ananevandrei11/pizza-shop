import { getAll } from './ingredients';
import { search } from './products';

export const Api = {
  products: {
    search,
  },
  ingredients: {
    getAll,
  },
};
