'use client';
import { cn } from '@/shared/lib/utils';
import { FormInput, WhiteBlock } from '../shared';
import { FormTextarea } from '../shared/form-components/form-textarea';

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutAddressForm = ({ loading, className }: Props) => {
  return (
    <WhiteBlock title="3. Delivery address" className={className}>
      <div
        className={cn('flex flex-col gap-5', {
          ['opacity-50 pointer-events-none']: loading,
        })}
      >
        <FormInput name="address" className="text-base" placeholder="Address" label="Address" />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Comments for order"
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};
