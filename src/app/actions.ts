'use server';

import { cookies } from 'next/headers';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CheckoutFormValues } from '@/shared/constants/checkout-form-schema';
import { sendEmail } from '@/shared/lib';
import { PayOrderTemplate } from '@/shared/components/email-temapltes';
import axios from 'axios';

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get('cartToken')?.value;

    if (!cartToken) {
      throw new Error('Cart token not found');
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error('Cart not found');
    }

    const { address, email, firstName, lastName, phone, comment } = data;
    const { totalAmount, items } = userCart;

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        totalAmount,
        status: OrderStatus.PENDING,
        fullName: firstName + ' ' + lastName,
        address: address,
        email: email,
        phone: phone,
        comment: comment,
        items: JSON.stringify(items),
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // TODO: ADD STRIPE
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: String(Math.random() * 1000),
      },
    });

    // TODO: ADD SEND EMAIL (SMTP - for example, nodemailer)
    console.log({
      orderId: order.id,
      totalAmount: order.totalAmount,
      paymentUrl: 'http://localhost:3000/?paid',
    });
    await sendEmail(
      email,
      'Next Pizza / Pay for the order #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl: 'http://localhost:3000/?paid',
      }),
    );

    // EXAMPLE AS WEBHOOK FOR STRIPE
    await axios.post('http://localhost:3000/api/checkout/callback', {
      object: {
        metadata: {
          order_id: order.id,
        },
      },
    });

    return 'http://localhost:3000/?paid';
  } catch (err) {
    console.log('[CART ORDER]: ', err);
  }
}
