'use client';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import qs from 'qs';

interface Props {
  filters: {
    ingredientsIds: Set<string>;
    sizesIds: Set<string>;
    pizzaTypesIds: Set<string>;
    prices: (number | undefined)[];
  };
}

export function useFiltersSetQueryParams({ filters }: Props) {
  const router = useRouter();

  const params = useMemo(
    () => ({
      ingredients: Array.from(filters.ingredientsIds),
      sizes: Array.from(filters.sizesIds),
      pizzaTypes: Array.from(filters.pizzaTypesIds),
      priceFrom: filters.prices[0],
      priceTo: filters.prices[1],
    }),
    [filters],
  );

  useEffect(() => {
    const queryString = qs.stringify(params, {
      arrayFormat: 'comma',
    });
    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [params, router]);
}
