'use client';

import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Input } from '../ui';
import { FilterCheckbox } from './filter-checkbox';

interface Item {
  text: string;
  value: string;
  children?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

interface Props {
  title?: string;
  items: Item[];
  defaultItems?: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  onChange?: (value: string[]) => void;
  defaultValue?: string[];
  className?: string;
}

export const CheckboxFIltersGroup = ({
  title,
  items,
  // defaultItems,
  // defaultValue,
  // limit,
  // onChange,
  searchInputPlaceholder,
  className,
}: Props) => {
  return (
    <div className={cn('', className)}>
      <p className="font-bold mb-3">{title}</p>

      <div className="mb-5">
        <Input placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
      </div>

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {items.map(item => (
          <FilterCheckbox key={item.value} text={item.text} value={item.value}>
            {item.children}
          </FilterCheckbox>
        ))}
      </div>
    </div>
  );
};
