'use client';

import toast from 'react-hot-toast';

import { ProductWithRelations } from '@/types/prisma';
import { ChoosePIzzaForm, ChooseProductForm } from '.';
import { useCartStore } from '@/shared/store';

interface Props {
  variant: 'page' | 'modal';
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm = ({ variant, onSubmit, product }: Props) => {
  const firstItem = product.items?.[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  const { loading, addCartItem } = useCartStore(state => ({
    addCartItem: state.addCartItem,
    loading: state.loading,
  }));

  const handleSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId || firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients: ingredients || undefined,
      });
      toast.success(`${product.name} is added`);
      onSubmit?.();
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : `Something went wrong while adding ${product.name.toLowerCase()}`;
      toast.error(message);
    }
  };

  return (
    <>
      {isPizzaForm ? (
        <ChoosePIzzaForm
          variant={variant}
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
          onSubmit={handleSubmit}
          loading={loading}
          className="w-full h-full"
        />
      ) : (
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          price={firstItem.price}
          onSubmit={() => handleSubmit()}
          loading={loading}
          className="w-full h-full"
        />
      )}
    </>
  );
};
