import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="All pizzas" className="font-extrabold" />
      </Container>
      <TopBar categories={categories} />

      <Container className="mt-10 pb-4">
        <div className="flex gap-[60px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* List of products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(category => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  htmlId={category.name}
                  items={category.products}
                  categoryId={category.id}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
