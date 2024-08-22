import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';

export const USER_MOCK_PRISMA: Prisma.UserCreateManyInput[] = [
  {
    fullName: 'User',
    email: 'user@mock.com',
    password: hashSync('user', 10),
    role: 'USER',
    verified: new Date(),
  },
  {
    fullName: 'Admin',
    email: 'admin@mock.com',
    password: hashSync('admin', 10),
    role: 'ADMIN',
    verified: new Date(),
  },
];

export const CATEGORIES_MOCK_PRISMA: Prisma.CategoryCreateManyInput[] = [
  {
    name: 'Pizza',
  },
  {
    name: 'Breakfast',
  },
  {
    name: 'Coffee',
  },
  {
    name: 'Snack',
  },
  {
    name: 'Drinks',
  },
];

export const INGREDIENTS_MOCK_PRISMA: Prisma.IngredientCreateManyInput[] = [
  {
    name: 'Cheese',
    price: 2,
    imageUrl: 'https://fakeimg.pl/215x215/ffff99/?text=Cheese',
  },
  {
    name: 'Mozzarella',
    price: 3,
    imageUrl: 'https://fakeimg.pl/215x215/ffffff/?text=Mozzarella',
  },
  {
    name: 'Garlic',
    price: 1,
    imageUrl: 'https://fakeimg.pl/215x215/f2e9d2/?text=Garlic',
  },
  {
    name: 'Pickles',
    price: 3,
    imageUrl: 'https://fakeimg.pl/215x215/384d3e/?text=Pickles',
  },
  {
    name: 'Red Onion',
    price: 0.5,
    imageUrl: 'https://fakeimg.pl/215x215/894452/?text=Onion',
  },
  {
    name: 'Tomatoes',
    price: 4,
    imageUrl: 'https://fakeimg.pl/215x215/ff0000/?text=Tomatoes',
  },
  {
    name: 'Sweet and sour sauce',
    price: 5,
    imageUrl: 'https://fakeimg.pl/215x215/c7700a/?text=Sweet',
  },
  {
    name: 'Mushrooms',
    price: 5,
    imageUrl: 'https://fakeimg.pl/215x215/BA9E88/?text=Mushrooms',
  },
  {
    name: 'Ham',
    price: 2.5,
    imageUrl: 'https://fakeimg.pl/215x215/F4BEB1/?text=Ham',
  },
  {
    name: 'Radish',
    price: 2.5,
    imageUrl: 'https://fakeimg.pl/215x215/b65867/?text=Radish',
  },
];

export const PRODUCTS_MOCK_PRISMA: Prisma.ProductCreateManyInput[] = [
  // {
  //   name: 'Pizza Margherita',
  //   imageUrl: 'https://fakeimg.pl/215x215',
  //   categoryId: 1,
  // },
  // {
  //   name: 'Pizza Capricciosa',
  //   imageUrl: 'https://fakeimg.pl/215x215',
  //   categoryId: 1,
  // },
  // {
  //   name: 'Pizza PedroTech',
  //   imageUrl: 'https://fakeimg.pl/215x215',
  //   categoryId: 1,
  // },
  // {
  //   name: 'Pizza Vegetariana',
  //   imageUrl: 'https://fakeimg.pl/215x215',
  //   categoryId: 1,
  // },
  // {
  //   name: 'Pizza Quatro Queijos',
  //   imageUrl: 'https://fakeimg.pl/215x215',
  //   categoryId: 1,
  // },
  {
    name: 'Cappuccino',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 3,
  },
  {
    name: 'Expresso',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 3,
  },
  {
    name: 'Coca Cola',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 5,
  },
  {
    name: 'Fanta',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 5,
  },
  {
    name: 'Sprite',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 5,
  },
  {
    name: 'Coca Cola Zero',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 5,
  },
  {
    name: 'Fried chicken',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 2,
  },
  {
    name: 'Fried fish',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 2,
  },
  {
    name: 'Fried rice',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 2,
  },
  {
    name: 'Chips',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 4,
  },
  {
    name: 'Popcorn',
    imageUrl: 'https://fakeimg.pl/215x215',
    categoryId: 4,
  },
];
