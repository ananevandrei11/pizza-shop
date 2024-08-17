'use client';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store';

interface Props {
  htmlId: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  categoryId: number;
  className?: string;
}

export const ProductsGroupList = ({ htmlId, items, title, categoryId, className }: Props) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    threshold: 0.4,
  });
  const setActiveId = useCategoryStore(state => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [intersection?.isIntersecting, setActiveId, categoryId]);

  return (
    <div className={cn('', className)} id={htmlId} ref={ref}>
      <Title text={title} size="lg" className="text-extrabold mb-5" />
      <ul className={cn('grid grid-cols-3 gap-[50px]')}>
        {items.map(product => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.items[0].price}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
