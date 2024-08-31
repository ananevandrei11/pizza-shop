'use client';

import { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { Product } from '@prisma/client';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store';
import { Title } from './title';
import { ProductCard } from './product-card';

interface Props {
  htmlId: string;
  title: string;
  items: Product[];
  categoryId: number;
  className?: string;
}

export const ProductsGroupList = ({ htmlId, items, title, categoryId, className }: Props) => {
  const ref = useRef(null);
  const intersection = useIntersection(ref, {
    threshold: 0.5,
  });

  const setActiveId = useCategoryStore(state => state.setActiveId);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [intersection?.isIntersecting, setActiveId, categoryId]);

  return (
    <div className={cn('', className)} id={htmlId} ref={ref}>
      <p>{intersection ? 'visible' : 'hidden'}</p>
      <Title text={title} size="lg" className="text-extrabold mb-5" />
      <ul className={cn('grid grid-cols-3 gap-[50px]')}>
        {items.map(product => (
          <li key={product.id}>
            <ProductCard
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              // @ts-ignore
              price={product?.items[0]?.price || 0}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
