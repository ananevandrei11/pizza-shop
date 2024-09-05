import { prisma } from '@/prisma/prisma-client';
import { updateCartTotalAmount } from '@/shared/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      throw new Error('[PATH CART ITEM ID]: Cart token not found');
    }

    const id = Number(params.id);
    const body = (await req.json()) as { quantity: number };
    const { quantity } = body;
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      throw new Error('[PATH CART ITEM ID]: Cart item not found');
    }
    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    });

    const updatedCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '[PATH CART ITEM ID]: Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      throw new Error('[DELETE CART ITEM ID]: Cart token not found');
    }

    const id = Number(params.id);
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!cartItem) {
      throw new Error('[DELETE CART ITEM ID]: Cart item not found');
    }
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    const updatedCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedCart);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '[DELETE CART ITEM ID]: Something went wrong';
    return NextResponse.json({ message }, { status: 500 });
  }
}
