'use client';
import { getCartItemsDetails } from '@/shared/lib';
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from '../shared';
import { CartStateItem } from '@/shared/store/cart';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  onClickRemove: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCartInfo = ({
  items,
  onClickCountButton,
  onClickRemove,
  loading,
  className,
}: Props) => {
  return (
    <WhiteBlock title="1. Cart" className={className}>
      <div className="flex flex-col gap-5">
        {loading &&
          Array.from({ length: 3 }, (_, i) => i + 1).map(i => <CheckoutItemSkeleton key={i} />)}

        {!loading &&
          items.map(i => (
            <CheckoutItem
              key={i.id}
              id={i.id}
              name={i.name}
              imageUrl={i.imageUrl}
              price={i.price}
              details={getCartItemsDetails({
                ingredients: i.ingredients || [],
                pizzaSize: i.pizzaSize,
                pizzaType: i.pizzaType,
              })}
              quantity={i.quantity}
              disabled={i.disabled}
              onClickCountButton={type => onClickCountButton(i.id, i.quantity, type)}
              onClickRemove={() => onClickRemove(i.id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
