/**
 * @see getAvailablePizzaSizes
 * @param type - type of pizza
 * @param items - list of products
 * @returns list of available pizza sizes
 */
import { ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType, pizzaSizes } from '../constants/pizza';

export function getAvailablePizzaSizes({ items, type }: { type: PizzaType; items: ProductItem[] }) {
  const pizzaAvailableSizeByType = items
    .filter(item => item.pizzaType === type)
    .map(item => item.size) as PizzaSize[];

  const availableSizes = pizzaSizes.map(size => ({
    value: size.value,
    name: size.name,
    disabled: !pizzaAvailableSizeByType.includes(size.value),
  }));

  return availableSizes;
}
