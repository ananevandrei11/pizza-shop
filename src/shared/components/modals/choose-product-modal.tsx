'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/types/prisma';
import { Dialog, DialogContent, DialogTitle } from '../ui';
import { ChoosePIzzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { useCartStore } from '@/shared/store';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  console.log(product);
  const router = useRouter();
  const firstItem = product.items?.[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);

  useEffect(() => {
    router.push(`/product/${product.id}`);
  }, [router, product]);

  const { loading, addCartItem } = useCartStore(state => ({
    addCartItem: state.addCartItem,
    loading: state.loading,
  }));

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId || firstItem.id;
      await addCartItem({
        productItemId: itemId,
        ingredients: ingredients || undefined,
      });
      router.back();
      toast.success(`${product.name} is added`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : `Something went wrong while adding ${product.name.toLowerCase()}`;
      toast.error(message);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn('p-0 max-w-[1060px] max-h-[90dvh] bg-white overflow-hidden', className)}
        aria-describedby="Choose pizza or product"
      >
        <div className="w-full h-full max-h-[inherit] overflow-auto scrollbar">
          <DialogTitle className="hidden" title="Choose pizza or product" />
          {isPizzaForm ? (
            <ChoosePIzzaForm
              imageUrl={product.imageUrl}
              name={product.name}
              ingredients={product.ingredients}
              items={product.items}
              onSubmit={onSubmit}
              loading={loading}
              className="w-full h-full"
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              price={firstItem.price}
              onSubmit={() => onSubmit()}
              loading={loading}
              className="w-full h-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
