'use client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';
import { ProductItem } from '@prisma/client';
import { PizzaSize, PizzaType } from '../constants';
import { getAvailablePizzaSizes } from '../lib';

export function usePizzaOptions(items: ProductItem[]) {
  const [size, setSize] = useState<PizzaSize>(25);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const availableSizes = getAvailablePizzaSizes({ items, type });
  const currentItemId = items.find(item => item.pizzaType === type && item.size === size)?.id;

  useEffect(() => {
    setSize(prev => {
      const availableSizeItem = availableSizes.find(item => item.value === prev && !item.disabled);
      if (!availableSizeItem) {
        return availableSizes.find(item => !item.disabled)?.value || prev;
      }
      return prev;
    });
  }, [availableSizes]);

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient: toggleIngredient,
  };
}
