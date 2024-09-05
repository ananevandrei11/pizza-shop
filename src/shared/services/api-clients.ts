import { addCartItem, getCart, removeCartItem, updateItemQuantity } from './cart';
import { getAll } from './ingredients';
import { search } from './products';

export const Api = {
  products: {
    search,
  },
  ingredients: {
    getAll,
  },
  cart: {
    getCart,
    updateItemQuantity,
    removeCartItem,
    addCartItem,
  },
};
