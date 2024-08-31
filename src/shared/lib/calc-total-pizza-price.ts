/** @deprecated
 *  @see calcTotalPizzaPrice
 *
 *  @param type - type of pizza`s dough
 *  @param size - size of pizza
 *  @param items - list of products
 *  @param ingredients - list of ingredients
 *  @param selectedIngredients - list of selected ingredients
 *  @returns total price of pizza
 */

import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaType, PizzaSize } from '../constants';

export function calcTotalPizzaPrice({
  items,
  ingredients,
  selectedIngredients,
  type,
  size,
}: {
  items: ProductItem[];
  ingredients: Ingredient[];
  selectedIngredients: Set<number>;
  type: PizzaType;
  size: PizzaSize;
}) {
  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;

  const ingredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = pizzaPrice !== 0 ? pizzaPrice + ingredientsPrice : 0;

  return totalPrice;
}
