'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebounce, useSet } from 'react-use';

export function useFilters() {
  const params = useSearchParams();
  const initData = {
    priceFrom: Number(params.get('priceFrom')) || 0,
    priceTo: Number(params.get('priceTo')) || 100,
    sizes: params.get('sizes')?.split(',') || [],
    pizzaTypes: params.get('pizzaTypes')?.split(',') || [],
    ingredients: params.get('ingredients')?.split(',') || [],
  };

  const [ingredientsIds, { toggle: setIngredients }] = useSet(
    new Set<string>(initData.ingredients),
  );

  const [sizesIds, { toggle: setSizes }] = useSet(new Set<string>(initData.sizes));

  const [pizzaTypesIds, { toggle: setPizzaTypes }] = useSet(new Set<string>(initData.pizzaTypes));

  const [prices, setPrices] = useState<number[]>([initData.priceFrom, initData.priceTo]);
  const [debouncedPrices, setDebouncedPrices] = useState<number[]>([
    initData.priceFrom,
    initData.priceTo,
  ]);

  useDebounce(
    () => {
      setDebouncedPrices(prices);
    },
    300,
    [prices],
  );

  return {
    filters: {
      ingredientsIds,
      sizesIds,
      pizzaTypesIds,
      prices: debouncedPrices,
    },
    handlers: {
      setIngredients,
      setSizes,
      setPizzaTypes,
      setPrices,
    },
  };
}
