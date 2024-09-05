import { CartItemDTO } from '../services/dto/cart.dto';

export function calcCartTotalPrice(item: CartItemDTO) {
  const mainPrice = item.productItem.price;
  const ingredientsPrice = item.ingredients.reduce((acc, i) => acc + i.price, 0);
  const totalPrice = (mainPrice + ingredientsPrice) * item.quantity;
  return totalPrice;
}
