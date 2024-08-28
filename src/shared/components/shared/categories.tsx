'use client';

import { Category } from '@prisma/client';
import { useCategoryStore } from '@/shared/store';
import { cn } from '@/shared/lib/utils';

interface Props {
  items: Category[];
  className?: string;
}

export const Categories = ({ items, className }: Props) => {
  const categoryActiveId = useCategoryStore(state => state.activeId);
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {items.map(category => (
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
