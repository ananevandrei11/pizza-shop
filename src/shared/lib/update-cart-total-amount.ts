import { prisma } from '@/prisma/prisma-client';
import { calcCartTotalPrice } from './calc-cart-total-price';

export async function updateCartTotalAmount(token: string) {
  const cartUser = await prisma.cart.findFirst({
    where: {
      token,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  if (!cartUser) {
    return;
  }
  const totalAmount = cartUser.items.reduce((acc, item) => {
    return acc + calcCartTotalPrice(item);
  }, 0);

  const updatedCart = await prisma.cart.update({
    where: {
      id: cartUser.id,
    },
    data: {
      totalAmount,
    },
    include: {
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          productItem: {
            include: {
              product: true,
            },
          },
          ingredients: true,
        },
      },
    },
  });

  return updatedCart;
}
