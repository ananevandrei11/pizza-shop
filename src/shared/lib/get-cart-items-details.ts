import { Ingredient } from '@prisma/client';
import { mapPizzaType, PizzaSize, PizzaType } from '../constants';

interface Args {
  pizzaType?: PizzaType | null;
  pizzaSize?: PizzaSize | null;
  ingredients: { name: Ingredient['name']; price: Ingredient['price'] }[] | null;
}
export function getCartItemsDetails({ pizzaSize, pizzaType, ingredients }: Args) {
  const details = [];

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType];
    details.push(`${typeName} ${pizzaSize} sm`);
  }

  if (ingredients) {
    details.push(...ingredients.map(ingredient => ingredient.name));
  }

  return details.join(', ');
}
