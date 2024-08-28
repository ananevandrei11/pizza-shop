'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/types/prisma';
import { Dialog, DialogContent, DialogTitle } from '../ui';
import { ChoosePIzzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items?.[0].pizzaType);

  useEffect(() => {
    router.push(`/product/${product.id}`);
  }, [router, product]);

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
              onSubmit={() => {}}
              className="w-full h-full"
            />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
              onSubmit={() => {}}
              className="w-full h-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
