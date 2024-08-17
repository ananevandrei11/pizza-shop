'use client';

import { useCategoryStore } from '@/store';
import { CATEGORY_PRODUCT_LIST } from '@/config/constants/mockData';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Categories = ({ className }: Props) => {
  const categoryActiveId = useCategoryStore(state => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {CATEGORY_PRODUCT_LIST.map(category => (
        <a
          href={'#' + category.name}
          key={category.name}
          className={cn('flex items-center font-bold h-11 rounded-2xl px-5', {
            'bg-white shadow-md shadow-gray-200 text-primary': category.id === categoryActiveId,
          })}
        >
          <span>{category.name}</span>
        </a>
      ))}
    </div>
  );
};
