import { AXIOS } from './instances';
import { ApiRoutes } from './constants';
import { CartDTO, CreateCartItemValuesDTO } from './dto/cart.dto';

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await AXIOS.get<CartDTO>(ApiRoutes.CART);
  return data;
};

export const addCartItem = async (values: CreateCartItemValuesDTO): Promise<CartDTO> => {
  const { data } = await AXIOS.post<CartDTO>(ApiRoutes.CART, values);
  return data;
};

export const updateItemQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
  const { data } = await AXIOS.patch<CartDTO>(ApiRoutes.CART + `/${id}`, { quantity });
  return data;
};

export const removeCartItem = async (id: number): Promise<CartDTO> => {
  const { data } = await AXIOS.delete<CartDTO>(ApiRoutes.CART + `/${id}`);
  return data;
};
