'use client';

import { PropsWithChildren } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Button,
  EURO,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemsDetails } from '@/shared/lib';
import Image from 'next/image';
import EmptyBox from '../../../../public/assets/images/empty-box.png';
import { useCart } from '@/shared/hooks';

interface Props {
  className?: string;
}

export const CartDrawer = ({ children }: PropsWithChildren<Props>) => {
  const { items, totalAmount, handleRemoveItem, handleUpdateQty } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1f1]">
        {!totalAmount && (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center justify-center w-full h-fit mx-auto">
              <Image
                src={EmptyBox.src}
                blurDataURL={EmptyBox.blurDataURL}
                width={60}
                height={60}
                alt="Empty Box"
                className="object-contain"
              />
            </div>
            <SheetClose asChild>
              <Button className="w-56 h-12 text-base flex items-center mx-auto" size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                <span>Close</span>
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <SheetHeader>
              <SheetTitle>{items.length} products in the cart</SheetTitle>
            </SheetHeader>
            <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
              {items.map(item => (
                <div className="mb-2" key={item.id}>
                  <CartDrawerItem
                    details={getCartItemsDetails({
                      pizzaType: item.pizzaType,
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
                    disabled={item.disabled}
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
                <Link href={'/checkout'}>
                  <Button asChild className="w-full h-12 text-base">
                    <ArrowRight className="w-5" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
