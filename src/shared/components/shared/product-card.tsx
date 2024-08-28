import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { Title } from './title';
import { Button, EURO } from '../ui';

interface Props {
  id: number;
  name: string;
  price: number;
  count?: number;
  imageUrl?: string;
  className?: string;
}

export const ProductCard = ({ id, price, name, imageUrl, className }: Props) => {
  return (
    <div className={cn('w-full', className)}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <Image
            className="w-[215px] h-[215px]"
            src={imageUrl || ''}
            alt={name}
            width={215}
            height={215}
          />
        </div>
      </Link>
      <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
      <p className="text-sm text-gray-400">Some kind of composition</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-[20px]">
          from{' '}
          <b>
            {price}
            &nbsp;
            <EURO />
          </b>
        </span>
        <Button variant="secondary">
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>

        {/* {count ? (
          <CountButton value={count} size="lg" />
        ) : (
          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-1" />
            Добавить
          </Button>
        )} */}
      </div>
    </div>
  );
};
