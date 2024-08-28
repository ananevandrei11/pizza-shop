import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/prisma-client';
import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared';

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
      <div className="grid grid-cols-[minmax(200px,_455px)_490px] gap-4 mx-auto">
        <PizzaImage src={product.imageUrl} alt={product.name} size={25} />
        <div className="p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-700">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum, alias quibusdam rem
            cumque sed hic atque iste aliquid repudiandae odio soluta tenetur est accusantium.
            Veniam iusto fuga ratione veritatis sunt?
          </p>

          <GroupVariants
            items={[
              {
                name: 'Small',
                value: '25',
              },
              {
                name: 'Medium',
                value: '35',
              },
              {
                name: 'Large',
                value: '45',
              },
            ]}
            value="25"
          />
        </div>
      </div>
    </Container>
  );
}
