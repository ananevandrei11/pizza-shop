import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      throw new Error('Code is not found');
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code,
      },
    });

    if (!verificationCode) {
      throw new Error('Code is not found');
    }

    await prisma.user.update({
      where: {
        id: verificationCode.id,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.log('[AUTH VERIFIED]: ', error);
    const errorMessage = error instanceof Error ? error.message : 'Code is not found';
    return NextResponse.json({ error: `[VERIFIED CODE]: ${errorMessage}` });
  }
}
