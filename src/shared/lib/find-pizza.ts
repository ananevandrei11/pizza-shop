import { prisma } from '@/prisma/prisma-client';

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  sizes?: string;
  pizzaTypes?: string;
  ingredients?: string;
  priceFrom?: string;
  priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

export async function findPizza(params: GetSearchParams) {
  const sizesIdArray = params.sizes?.split(',').map(Number);
  const pizzaTypesIdArray = params.pizzaTypes?.split(',').map(Number);
  const ingredientsIdArray = params.ingredients?.split(',').map(Number);

  const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: {
          id: 'desc',
        },
        where: {
          ingredients: ingredientsIdArray
            ? {
                some: {
                  id: {
                    in: ingredientsIdArray,
                  },
                },
              }
            : undefined,

          items: {
            some: {
              size: {
                in: sizesIdArray,
              },
              pizzaType: {
                in: pizzaTypesIdArray,
              },
              price: {
                gte: minPrice, // >= grater then equal
                lte: maxPrice, // <= less them equal
              },
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: 'asc',
            },
          },
        },
      },
    },
  });

  return categories;
}
