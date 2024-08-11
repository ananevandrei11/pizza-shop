import { Container, Filters, Title, TopBar } from '@/components/shared';

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="All pizzas" className="font-extrabold" />
      </Container>
      <TopBar />

      <Container className="mt-10 pb-4">
        {/* Filters */}
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
        </div>
        {/* List of products */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">List of products</div>
        </div>
      </Container>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}
