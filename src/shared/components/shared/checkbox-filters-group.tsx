'use client';

import { ChangeEvent, ReactNode, useState } from 'react';

import { cn } from '@/shared/lib/utils';
import { Input, Skeleton } from '../ui';
import { FilterCheckbox } from './filter-checkbox';

interface Item {
  text: string;
  value: string;
  children?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

interface Props {
  prefixName: string;
  title?: string;
  items: Item[];
  checkedValues?: Set<string>;
  limit?: number;
  searchInputPlaceholder?: string;
  loading?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export const CheckboxFIltersGroup = ({
  prefixName,
  title,
  items,
  limit = 6,
  onChange,
  searchInputPlaceholder = 'Search...',
  loading,
  checkedValues,
  className,
}: Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const loadingList = Array.from({ length: 6 }).fill(0);
  const limitedList = items.slice(0, limit);
  const list = showAll ? items : limitedList;
  const preparedList = list.filter(item =>
    item.text.toLowerCase().includes(searchValue.toLowerCase()),
  );
  const prefix = prefixName.split(' ').join('-') + '-';

  return (
    <div className={cn('', className)}>
      <p className="font-bold mb-3">{title}</p>

      {items.length > limit && (
        <div className="mb-5">
          <Input
            name={prefix + 'search'}
            onChange={handleSearch}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      {loading && (
        <>
          <div className="flex flex-col gap-4 max-h-80 pr-2 overflow-auto scrollbar">
            {loadingList.map((_, ind) => (
              <Skeleton key={ind} className="w-full h-6" />
            ))}
          </div>
          <div className="border-t border-t-neutral-100 mt-4">
            <Skeleton className="w-full h-6" />
          </div>
        </>
      )}

      {!loading && (
        <>
          <div className="flex flex-col gap-4 max-h-80 pr-2 overflow-auto scrollbar">
            {preparedList.map(item => (
              <FilterCheckbox
                key={item.value}
                text={item.text}
                value={prefix + item.value}
                checked={checkedValues?.has(item.value)}
                onCheckedChange={() => onChange?.(item.value)}
              />
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
        </>
      )}
    </div>
  );
};
