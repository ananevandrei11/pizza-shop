import { prisma } from '@/prisma/prisma-client';
import { getUserSession } from '@/shared/lib/get-user-session';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUserSession();

    if (!user) {
      throw new Error('Not authorization');
    }

    const data = await prisma.user.findFirst({
      where: {
        id: Number(user.id),
      },
      select: {
        fullName: true,
        email: true,
        password: false,
      },
    });

    if (!data) {
      throw new Error('User is not found');
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: '[USER GET SESSION]: ' + error });
  }
}
