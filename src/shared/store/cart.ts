import { create } from 'zustand';
import { Api } from '../services/api-clients';
import { getCartDetails } from '../lib';
import { PizzaSize, PizzaType } from '../constants';
import { CreateCartItemValuesDTO } from '../services/dto/cart.dto';

export interface CartStateItem {
  id: number;
  quantity: number;
  imageUrl: string;
  name: string;
  price: number;
  pizzaSize?: PizzaSize | null;
  pizzaType?: PizzaType | null;
  ingredients?: { name: string; price: number }[];
  disabled?: boolean;
}

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: CreateCartItemValuesDTO) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>(set => ({
  loading: true,
  error: false,
  totalAmount: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set(state => {
        const upgradedItems = state.items.map(item =>
          item.id === id ? { ...item, disabled: true } : item,
        );
        return {
          loading: true,
          error: false,
          items: upgradedItems,
        };
      });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set(state => ({
        loading: false,
        items: state.items.map(item => ({ ...item, disabled: false })),
      }));
    }
  },
  addCartItem: async values => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set(state => {
        const upgradedItems = state.items.map(item =>
          item.id === id ? { ...item, disabled: true } : item,
        );
        return {
          loading: true,
          error: false,
          items: upgradedItems,
        };
      });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
