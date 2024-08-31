'use client';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';
import { Button, EURO } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';

interface Props {
  className?: string;
}

export const CartButton = ({ className }: Props) => {
  const { totalAmount, loading, items } = useCartStore(state => ({
    totalAmount: state.totalAmount,
    loading: state.loading,
    items: state.items,
  }));

  return (
    <CartDrawer>
      <Button
        loading={loading}
        variant="default"
        className={cn('flex items-center gap-3 group relative', className)}
      >
        <b>
          {totalAmount} <EURO />
        </b>
        <span className="h-full w-[1px] bg-white/30 mx-1" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
