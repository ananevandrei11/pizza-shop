'use client';

import {
  CartCheckoutTotal,
  CheckoutItem,
  Container,
  Title,
  WhiteBlock,
} from '@/shared/components/shared';
import { Input, Textarea } from '@/shared/components/ui';
import { useCart } from '@/shared/hooks';
import { getCartItemsDetails } from '@/shared/lib';

export default function CheckoutPage() {
  const { items, totalAmount, handleRemoveItem, handleUpdateQty } = useCart();
  const taxPrice = 0;
  const deliveryPrice = 0;

  return (
    <Container className="pt-6">
      <Title text="Checkout" size="xl" className="font-extrabold" />
      <div className="flex gap-10">
        <section className="flex flex-col gap-10 flex-1 mb-20">
          <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
              {items.map(i => (
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
                  onClickCountButton={type => handleUpdateQty(i.id, i.quantity, type)}
                  onClickRemove={() => handleRemoveItem(i.id)}
                />
              ))}
            </div>
          </WhiteBlock>
          <WhiteBlock title="2. Personal data">
            <div className="grid grid-cols-2 gap-5">
              <Input name="firstName" className="text-base" placeholder="First Name" />
              <Input name="lastName" className="text-base" placeholder="Last Name" />
              <Input name="email" className="text-base" placeholder="E-Mail" />
              <Input name="phone" className="text-base" placeholder="Phone" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Delivery address">
            <div className="flex flex-col gap-5">
              <Input name="address" className="text-base" placeholder="Address" />
              <Textarea
                name="comment"
                className="text-base"
                placeholder="Comments for order"
                rows={5}
              />
            </div>
          </WhiteBlock>
        </section>
        <section className="w-1/4">
          <CartCheckoutTotal
            totalAmount={totalAmount}
            taxPrice={taxPrice}
            deliveryPrice={deliveryPrice}
          />
        </section>
      </div>
    </Container>
  );
}
