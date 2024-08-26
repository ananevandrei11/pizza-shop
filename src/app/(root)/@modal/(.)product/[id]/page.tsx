import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { ChooseProductModal } from '@/components/modals';

interface Props {
  params: {
    id: string;
  };
}
export default async function ProductModalPage({ params }: Props) {
  const { id } = params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
