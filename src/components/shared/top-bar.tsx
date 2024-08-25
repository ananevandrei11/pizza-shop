import { Category, Product } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';

interface Props {
  categories: (Category & {
    products: Product[];
  })[];
  className?: string;
}

export const TopBar = ({ categories, className }: Props) => {
  return (
    <div className={cn('sticky z-40 top-0 bg-white py-5 shadow-lg shadow-black/5', className)}>
      <Container className="flex items-center justify-between">
        <Categories items={categories.filter(category => category?.products?.length > 0)} />
        <SortPopup />
      </Container>
    </div>
  );
};
