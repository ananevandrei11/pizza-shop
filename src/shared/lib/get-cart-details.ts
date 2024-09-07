import { PizzaSize, PizzaType } from '../constants';
import { CartDTO } from '../services/dto/cart.dto';
import { calcCartTotalPrice } from './calc-cart-total-price';

export function getCartDetails(data: CartDTO) {
  const { totalAmount, items } = data;

  const preparedItems = items.map(item => {
    const ingredients = item.ingredients.map(i => ({
      name: i.name,
      price: i.price,
    }));

    return {
      id: item.id,
      quantity: item.quantity,
      name: item.productItem.product.name,
      imageUrl: item.productItem.product.imageUrl,
      price: calcCartTotalPrice(item),
      pizzaSize: item.productItem.size as PizzaSize,
      pizzaType: item.productItem.pizzaType as PizzaType,
      ingredients,
      disabled: false,
    };
  });

  return {
    totalAmount,
    items: preparedItems,
  };
}
