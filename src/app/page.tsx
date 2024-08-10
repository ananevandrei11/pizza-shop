import { Categories, Container, Title } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title size="lg" text="All pizzas" className="font-extrabold" />
        <Categories />
      </Container>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}
