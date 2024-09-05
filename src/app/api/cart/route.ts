import { prisma } from '@/prisma/prisma-client';
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib';
import { CreateCartItemValuesDTO } from '@/shared/services/dto/cart.dto';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ items: {} });
    }

    const userCart = await prisma.cart.findFirst({
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

    return NextResponse.json(userCart);
  } catch {
    console.error('[GET CART]: Cart not found');
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const body = (await req.json()) as CreateCartItemValuesDTO;
    const userCart = await findOrCreateCart(token);

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: body.productItemId,
        ingredients: {
          every: { id: { in: body.ingredients } },
        },
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: body.productItemId,
          quantity: 1,
          ingredients: { connect: body.ingredients?.map(id => ({ id })) },
        },
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set('cartToken', token);
    return response;
  } catch {
    console.error('[POST CART]: Cart not found');
  }
}
