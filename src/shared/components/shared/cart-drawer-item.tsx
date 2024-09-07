'use client';
import { Trash2Icon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import * as CartItem from './cart-item-details';
import type { CartItemProps } from './cart-item-details';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CartDrawerItem = ({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled,
  onClickCountButton,
  onClickRemove,
}: Props) => {
  return (
    <div
      className={cn('flex bg-white p-5 gap-6', className, {
        ['opacity-50 pointer-events-none']: disabled,
      })}
    >
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info details={details} name={name} />
        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CartItem.CountButton value={quantity} onClick={onClickCountButton} />
          <div className="flex items-center gap-2">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="flex-shrink-0 text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
