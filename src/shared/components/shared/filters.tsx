'use client';
import { cn } from '@/shared/lib/utils';
import { useFilters, useFiltersSetQueryParams, useGetIngredients } from '@/shared/hooks';

import { Title } from './title';
import { CheckboxFIltersGroup } from './checkbox-filters-group';
import { RangePrices } from './range-prices';

interface Props {
  className?: string;
}

const SIZES = [
  {
    text: '25 sm',
    value: '25',
  },
  {
    text: '35 sm',
    value: '35',
  },
  {
    text: '45 sm',
    value: '45',
  },
];

const PIZZA_TYPES = [
  {
    text: 'Thin',
    value: '1',
  },
  {
    text: 'Thick',
    value: '2',
  },
];

export const Filters = ({ className }: Props) => {
  const { ingredients, loading: ingredientsLoading } = useGetIngredients();
  const ingredientsList = ingredients.map(ing => ({ value: String(ing.id), text: ing.name }));

  const { filters, handlers } = useFilters();

  useFiltersSetQueryParams({
    filters,
  });

  return (
    <div className={cn('', className)}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />
      <RangePrices initPrices={filters.prices} updateInitPrices={handlers.setPrices} />
      <CheckboxFIltersGroup
        prefixName="sizes-pizza"
        title="Sizes pizza"
        className="mt-5"
        limit={6}
        items={SIZES}
        checkedValues={filters.sizesIds}
        onChange={handlers.setSizes}
      />
      <CheckboxFIltersGroup
        prefixName="pizza-types"
        title="Dough"
        className="mt-5"
        limit={6}
        items={PIZZA_TYPES}
        checkedValues={filters.pizzaTypesIds}
        onChange={handlers.setPizzaTypes}
      />
      <CheckboxFIltersGroup
        prefixName="ingredients"
        title="Ingredients"
        className="mt-5"
        limit={6}
        items={ingredientsList}
        checkedValues={filters.ingredientsIds}
        loading={ingredientsLoading}
        onChange={handlers.setIngredients}
      />
    </div>
  );
};
