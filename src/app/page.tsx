import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared';
import { CATEGORY_PRODUCT_LIST } from '@/config/constants/mockData';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="All pizzas" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-4">
        <div className="flex gap-[60px]">
          {/* Filters */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* List of products */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {CATEGORY_PRODUCT_LIST.map(category => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  htmlId={category.name}
                  items={category.items}
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
