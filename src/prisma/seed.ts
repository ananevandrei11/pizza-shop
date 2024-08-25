import { prisma } from './prisma-client';
import {
  CATEGORIES_MOCK_PRISMA,
  INGREDIENTS_MOCK_PRISMA,
  PRODUCTS_MOCK_PRISMA,
  USER_MOCK_PRISMA,
} from './constants-mock';
import { Prisma } from '@prisma/client';

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const generatePizza = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType: 1 | 2;
  size: 25 | 35 | 45;
}): Prisma.ProductItemCreateManyInput => {
  return {
    productId,
    size,
    pizzaType,
    price: randomNumber(5, 15),
  };
};

async function generateMockData() {
  await prisma.user.createMany({
    data: USER_MOCK_PRISMA,
  });

  await prisma.category.createMany({
    data: CATEGORIES_MOCK_PRISMA,
  });

  await prisma.ingredient.createMany({
    data: INGREDIENTS_MOCK_PRISMA,
  });

  await prisma.product.createMany({
    data: PRODUCTS_MOCK_PRISMA,
  });

  const pizzaMargherita = await prisma.product.create({
    data: {
      name: 'Pizza Margherita',
      categoryId: 1,
      imageUrl: 'https://fakeimg.pl/215x215/ffff99/?text=Margherita',
      ingredients: { connect: [{ id: 2 }, { id: 3 }, { id: 6 }] },
    },
  });

  const pizzaCapricciosa = await prisma.product.create({
    data: {
      name: 'Pizza Capricciosa',
      categoryId: 1,
      imageUrl: 'https://fakeimg.pl/215x215/ffff99/?text=Capricciosa',
      ingredients: { connect: [{ id: 2 }, { id: 3 }, { id: 6 }, { id: 8 }, { id: 9 }] },
    },
  });

  const pizzaFourCheese = await prisma.product.create({
    data: {
      name: 'Pizza Four Cheese',
      categoryId: 1,
      imageUrl: 'https://fakeimg.pl/215x215/ffff99/?text=Four Cheese',
      ingredients: { connect: [{ id: 1 }, { id: 6 }, { id: 9 }] },
    },
  });

  await prisma.productItem.createMany({
    data: [
      generatePizza({ productId: pizzaMargherita.id, pizzaType: 1, size: 35 }),
      generatePizza({ productId: pizzaMargherita.id, pizzaType: 2, size: 25 }),
      generatePizza({ productId: pizzaCapricciosa.id, pizzaType: 1, size: 35 }),
      generatePizza({ productId: pizzaCapricciosa.id, pizzaType: 2, size: 25 }),
      generatePizza({ productId: pizzaFourCheese.id, pizzaType: 1, size: 35 }),
      generatePizza({ productId: pizzaFourCheese.id, pizzaType: 2, size: 25 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: '1',
      },
      {
        userId: 2,
        totalAmount: 0,
        token: '2',
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productItemId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    },
  });
}

async function clearMockData() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await clearMockData();
    await generateMockData();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
