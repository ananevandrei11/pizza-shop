'use client';
import { PropsWithChildren, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Button,
  EURO,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemsDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';

interface Props {
  className?: string;
}

export const CartDrawer = ({ children }: PropsWithChildren<Props>) => {
  const { totalAmount, items, fetchCartItems, updateItemQuantity, removeCartItem } = useCartStore(
    state => ({
      totalAmount: state.totalAmount,
      items: state.items,
      fetchCartItems: state.fetchCartItems,
      updateItemQuantity: state.updateItemQuantity,
      removeCartItem: state.removeCartItem,
    }),
  );

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleUpdateQty = (id: number, quantity: number, type: 'plus' | 'minus') => {
    console.log(id, quantity, type);
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    if (newQuantity < 1) return;
    updateItemQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: number) => {
    removeCartItem(id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1f1]">
        <SheetHeader>
          <SheetTitle>{items.length} products in the cart</SheetTitle>
        </SheetHeader>
        <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
          {items.map(item => (
            <div className="mb-2" key={item.id}>
              <CartDrawerItem
                details={getCartItemsDetails({
                  pizzaType: item.type,
                  pizzaSize: item.pizzaSize,
                  ingredients: item.ingredients || [],
                })}
                price={item.price}
                quantity={item.quantity}
                imageUrl={item.imageUrl}
                name={item.name}
                id={item.id}
                onClickCountButton={type => handleUpdateQty(item.id, item.quantity, type)}
                onClickRemove={() => handleRemoveItem(item.id)}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <b className="flex mb-4">
              Total:
              <span className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              <span className="text-lg">
                {totalAmount} <EURO />
              </span>
            </b>
            <Link href={'/cart'}>
              <Button asChild className="w-full h-12 text-base">
                <ArrowRight className="w-5" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
