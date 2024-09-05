import { Suspense } from 'react';
import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/shared/components/shared';
import { findPizza, GetSearchParams } from '@/shared/lib';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizza(searchParams);

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
            <Suspense>
              <Filters />
            </Suspense>
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
