'use client';

import { cn } from '@/shared/lib/utils';
import { FormInput, WhiteBlock } from '../shared';

interface Props {
  loading?: boolean;
  className?: string;
}

export const CheckoutPersonalForm = ({ loading, className }: Props) => {
  return (
    <WhiteBlock title="2. Personal data" className={className}>
      <div
        className={cn('grid grid-cols-2 gap-5', {
          ['opacity-50 pointer-events-none']: loading,
        })}
      >
        <FormInput
          className="text-base"
          name="firstName"
          placeholder="First Name"
          label="First Name"
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Last Name"
          label="Last Name"
        />
        <FormInput name="email" className="text-base" placeholder="E-Mail" label="E-Mail" />
        <FormInput name="phone" className="text-base" placeholder="Phone" label="Phone" />
      </div>
    </WhiteBlock>
  );
};
