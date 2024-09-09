'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartCheckoutTotal, Container, Title } from '@/shared/components/shared';
import { useCart } from '@/shared/hooks';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import {
  CheckoutAddressForm,
  CheckoutCartInfo,
  CheckoutPersonalForm,
} from '@/shared/components/checkout';
import { createOrder } from '@/app/actions';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, totalAmount, loading, handleRemoveItem, handleUpdateQty } = useCart();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const taxPrice = 0;
  const deliveryPrice = 0;

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const url = await createOrder(data);
      toast.success('Go to pay');

      if (url) {
        console.log('url', url);
        // location.href = url;
      }
    } catch (err) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Container className="pt-6">
      <Title text="Checkout" size="xl" className="font-extrabold" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-10">
          <FormProvider {...form}>
            <section className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCartInfo
                loading={loading}
                items={items}
                onClickCountButton={handleUpdateQty}
                onClickRemove={handleRemoveItem}
              />
              <CheckoutPersonalForm loading={loading} />
              <CheckoutAddressForm loading={loading} />
            </section>
          </FormProvider>
          <section className="w-1/4">
            <CartCheckoutTotal
              loading={loading || form.formState.isLoading}
              totalAmount={totalAmount}
              taxPrice={taxPrice}
              deliveryPrice={deliveryPrice}
            />
          </section>
        </form>
      </FormProvider>
    </Container>
  );
}
