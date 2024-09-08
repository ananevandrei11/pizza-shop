import { cn } from '@/shared/lib/utils';
import { Package, Percent, Truck, ArrowRight } from 'lucide-react';
import { EURO, Button } from '../ui';
import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';

interface Props {
  totalAmount: number;
  taxPrice: number;
  deliveryPrice: number;
  className?: string;
}

export const CartCheckoutTotal = ({ totalAmount, taxPrice, deliveryPrice, className }: Props) => {
  const totalPrice = totalAmount + taxPrice + deliveryPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-extrabold">Total:</span>
        <span className="font-bold text-lg">
          {totalPrice} <EURO />
        </span>
      </div>

      <CheckoutItemDetails
        title={
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>Products</span>
          </span>
        }
        value={
          <>
            {totalAmount} <EURO />
          </>
        }
      />
      <CheckoutItemDetails
        title={
          <span className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            <span>Tax</span>
          </span>
        }
        value={
          <>
            0 <EURO />
          </>
        }
      />
      <CheckoutItemDetails
        title={
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Delivery</span>
          </span>
        }
        value={
          <>
            0 <EURO />
          </>
        }
      />
      <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Payment
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
