'use client';
import { useEffect, useState } from 'react';
import { useSet } from 'react-use';

import { cn } from '@/shared/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants';
import { GroupVariants, IngredientItem, PizzaImage, Title } from '../shared';
import { Button, EURO } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePIzzaForm = ({
  imageUrl,
  name,
  ingredients,
  items,
  // onSubmit,
  // loading,
  className,
}: Props) => {
  const [size, setSize] = useState<PizzaSize>(25);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const pizzaAvailableSizeByType = items
    .filter(item => item.pizzaType === type)
    .map(item => item.size) as PizzaSize[];
  const availableSizes = pizzaSizes.map(size => ({
    value: size.value,
    name: size.name,
    disabled: !pizzaAvailableSizeByType.includes(size.value),
  }));
  console.log({ pizzaAvailableSizeByType, availableSizes });

  useEffect(() => {
    setSize(prev => {
      if (
        !pizzaAvailableSizeByType.some(size => size === prev) &&
        pizzaAvailableSizeByType.length > 0
      ) {
        return pizzaAvailableSizeByType[0];
      }
      return prev;
    });
  }, [pizzaAvailableSizeByType]);

  const pizzaPrice = items.find(item => item.pizzaType === type && item.size === size)?.price || 0;
  const ingredientsPrice = ingredients
    .filter(ingredient => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  const totalPrice = pizzaPrice !== 0 ? pizzaPrice + ingredientsPrice : 0;

  const handleSubmit = () => {
    console.log({ size, type, selectedIngredients, totalPrice });
  };

  return (
    <div className={cn('grid grid-cols-[minmax(200px,455px)_1fr] gap-4 m-auto ', className)}>
      <div className="p-2 self-center">
        <PizzaImage src={imageUrl} alt={name} size={size} />
      </div>

      <div className="p-7 bg-[#f5f5f5] flex flex-col gap-4">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">Some kind of composition</p>
        <GroupVariants<PizzaSize> items={availableSizes} value={size} onClick={setSize} />
        <GroupVariants<PizzaType> items={pizzaTypes} value={type} onClick={setType} />
        <div className="bg-gray-50 p-4 rounded-md max-h-[320px] overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                imageUrl={ingredient.imageUrl}
                name={ingredient.name}
                price={ingredient.price}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => toggleIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          disabled={totalPrice === 0}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleSubmit}
        >
          Add to cart {totalPrice} <EURO />
        </Button>
      </div>
    </div>
  );
};
