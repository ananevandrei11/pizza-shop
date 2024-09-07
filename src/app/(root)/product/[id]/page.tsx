import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { Container } from '@/shared/components/shared';
import { ProductForm } from '@/shared/components/modals';

interface Props {
  params: {
    id: string;
  };
}
export default async function ProductPage({ params }: Props) {
  const { id } = params;
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} variant="page" />
    </Container>
  );
}
