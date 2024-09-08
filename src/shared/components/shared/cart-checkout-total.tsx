import { cn } from '@/shared/lib/utils';
import { Package, Percent, Truck, ArrowRight } from 'lucide-react';
import { EURO, Button, Skeleton } from '../ui';
import { CheckoutItemDetails } from './checkout-item-details';
import { WhiteBlock } from './white-block';

interface Props {
  totalAmount: number;
  taxPrice: number;
  deliveryPrice: number;
  loading?: boolean;
  className?: string;
}

const Price = ({ loading, value }: { loading?: boolean; value: number }) => {
  if (loading) {
    return <Skeleton className="w-12 h-7" />;
  }
  return (
    <>
      {value} <EURO />
    </>
  );
};

export const CartCheckoutTotal = ({
  totalAmount,
  taxPrice,
  deliveryPrice,
  loading,
  className,
}: Props) => {
  const totalPrice = totalAmount + taxPrice + deliveryPrice;

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl font-extrabold">Total:</span>
        <span className="font-bold text-lg">
          <Price loading={loading} value={totalPrice} />
        </span>
      </div>

      <CheckoutItemDetails
        title={
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            <span>Products</span>
          </span>
        }
        value={<Price loading={loading} value={totalAmount} />}
      />
      <CheckoutItemDetails
        title={
          <span className="flex items-center gap-2">
            <Percent className="w-4 h-4" />
            <span>Tax</span>
          </span>
        }
        value={<Price loading={loading} value={0} />}
      />
      <CheckoutItemDetails
        title={
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            <span>Delivery</span>
          </span>
        }
        value={<Price loading={loading} value={0} />}
      />
      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        disabled={loading}
      >
        Payment
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
