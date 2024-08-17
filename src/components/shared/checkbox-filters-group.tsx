'use client';

import { ChangeEvent, ReactNode, useState } from 'react';

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
  defaultItems,
  // defaultValue,
  limit = 6,
  // onChange,
  searchInputPlaceholder,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };
  const limitedList = (items || defaultItems).slice(0, limit);
  const list = showAll ? items : limitedList;
  const preparedList = list.filter(item =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className={cn('', className)}>
      <p className="font-bold mb-3">{title}</p>

      <div className="mb-5">
        <Input
          onChange={handleSearch}
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
        />
      </div>

      <div className="flex flex-col gap-4 max-h-80 pr-2 overflow-auto scrollbar">
        {preparedList.map(item => (
          <FilterCheckbox key={item.value} text={item.text} value={item.value}>
            {item.children}
          </FilterCheckbox>
        ))}
      </div>

      {items.length > limit && (
        <div
          className={cn({
            ['border-t border-t-neutral-100 mt-4']: showAll,
          })}
        >
          <button
            type="button"
            className="text-primary mt-3"
            onClick={() => setShowAll(prev => !prev)}
          >
            {showAll ? 'Hide' : 'Show all'}
          </button>
        </div>
      )}
    </div>
  );
};
