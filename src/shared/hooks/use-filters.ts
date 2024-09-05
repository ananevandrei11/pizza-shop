'use client';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useDebounce, useSet } from 'react-use';

export function useFilters() {
  const params = useSearchParams();
  const initData = {
    priceFrom: Number(params.get('priceFrom')) || undefined,
    priceTo: Number(params.get('priceTo')) || undefined,
    sizes: params.get('sizes')?.split(',') || [],
    pizzaTypes: params.get('pizzaTypes')?.split(',') || [],
    ingredients: params.get('ingredients')?.split(',') || [],
  };

  const [ingredientsIds, { toggle: setIngredients }] = useSet(
    new Set<string>(initData.ingredients),
  );

  const [sizesIds, { toggle: setSizes }] = useSet(new Set<string>(initData.sizes));

  const [pizzaTypesIds, { toggle: setPizzaTypes }] = useSet(new Set<string>(initData.pizzaTypes));

  const [prices, setPrices] = useState<(number | undefined)[]>([
    initData.priceFrom,
    initData.priceTo,
  ]);
  const [debouncedPrices, setDebouncedPrices] = useState<(number | undefined)[]>([
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

  return useMemo(
    () => ({
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
    }),
    [
      debouncedPrices,
      ingredientsIds,
      pizzaTypesIds,
      setIngredients,
      setPizzaTypes,
      setSizes,
      sizesIds,
    ],
  );
}
