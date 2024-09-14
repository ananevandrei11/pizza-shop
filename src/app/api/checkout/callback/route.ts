import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/shared/lib';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import { OrderSuccessTemplate } from '@/shared/components/email-temapltes/order-success';

const api = '[Checkout Callback]';

export async function POST(req: NextRequest) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = (await req.json()) as { [key: string]: any };

    const order = await prisma.order.findFirst({
      where: {
        id: body.object.metadata.order_id,
      },
      include: {
        user: true,
      },
    });

    if (!order) {
      throw new Error('Order not found');
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: OrderStatus.SUCCESEDED,
      },
    });

    const items = (JSON.parse(order?.items as string) as CartItemDTO[]) || [];

    await sendEmail(
      order.email,
      'Next Pizza / Success Order #' + order.id,
      OrderSuccessTemplate({
        orderId: order.id,
        items,
      }),
    );
  } catch (error) {
    console.log(`${api} Error: ${error}`);
    return NextResponse.json({ error: `${api} Error: Server Error` });
  }
}
