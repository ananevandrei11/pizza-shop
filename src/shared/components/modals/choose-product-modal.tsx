'use client';

import { useRouter } from 'next/navigation';

import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/types/prisma';
import { Dialog, DialogContent, DialogTitle } from '../ui';
import { ProductForm } from './product-form';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal = ({ product, className }: Props) => {
  const router = useRouter();

  const handleSubmit = () => {
    router.back();
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={handleSubmit}>
      <DialogContent
        className={cn('p-0 max-w-[1060px] max-h-[90dvh] bg-white overflow-hidden', className)}
        aria-describedby="Choose pizza or product"
      >
        <div className="w-full h-full max-h-[inherit] overflow-auto scrollbar">
          <DialogTitle className="hidden" title="Choose pizza or product" />
          <ProductForm product={product} variant="modal" onSubmit={handleSubmit} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
