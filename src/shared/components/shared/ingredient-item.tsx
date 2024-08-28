/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import Image from 'next/image';
import { CircleCheck } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { EURO } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem = ({ className, active, price, name, imageUrl, onClick }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md text-center relative cursor-pointer shadow-md bg-white',
        { 'shadow-primary shadow-[0_0_0_1px]': active },
        className,
      )}
      role="button"
      aria-roledescription={`Choose an ingredient ${name}`}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <Image width={110} height={110} src={imageUrl} alt={name} />
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">
        {price} <EURO />
      </span>
    </div>
  );
};
