export const mapPizzaSize = {
  25: 'Small',
  35: 'Medium',
  45: 'Large',
} as const;

export const mapPizzaType = {
  1: 'Thin',
  2: 'Thick',
} as const;

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([key, value]) => ({
  value: Number(key) as PizzaSize,
  name: value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([key, value]) => ({
  value: Number(key) as PizzaType,
  name: value,
}));
