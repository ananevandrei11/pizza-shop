'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useClickAway, useDebounce } from 'react-use';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Api } from '@/services/api-clients';

interface Props {
  className?: string;
}

export const SearchInput = ({ className }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>();
  const [products, setProducts] = useState<Product[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const searchRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setFocused(false);
  };

  useClickAway(searchRef, () => {
    handleClear();
    setSearchQuery('');
  });

  useDebounce(
    () => {
      setDebouncedValue(searchQuery);
    },
    500,
    [searchQuery],
  );

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 0) {
      Api.products
        .search(debouncedValue)
        .then(res => setProducts(res))
        .catch(() => setProducts([]));
    } else {
      setProducts([]);
    }
  }, [debouncedValue]);

  return (
    <>
      {focused && <div className="fixed inset-0 bg-black/50 z-50" />}
      <div
        ref={searchRef}
        className={cn('relative flex rounded-2xl flex-1 justify-between h-11 z-50', className)}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-50 pl-11"
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onFocus={() => setFocused(true)}
          onChange={handleChange}
        />
        <div
          className={cn(
            'absolute top-14 w-full bg-white rounded-xl shadow-md transition-all duration-200 invisible opacity-0 z-50 overflow-hidden',
            {
              ['visible opacity-100 top-12']: focused,
            },
          )}
        >
          <ul className="max-h-24 md:max-h-36 overflow-y-auto py-2">
            {products.length === 0 && <li className="px-3 py-2 w-full">No results found</li>}
            {products.map(item => (
              <li key={item.id}>
                <Link
                  href=""
                  className="flex justify-start items-center gap-2 hover:bg-primary/10 px-3 py-2 w-full"
                  onClick={() => setSearchQuery(item.name)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="rounded-full h-4 w-4"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
