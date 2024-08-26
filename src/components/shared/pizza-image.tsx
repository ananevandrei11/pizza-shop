/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  size?: 25 | 35 | 45;
  alt?: string;
  className?: string;
}

export const PizzaImage = ({ src, size, alt, className }: Props) => {
  const sizeClassName =
    (size === 25 && '1/2') || (size === 35 && '3/4') || (size === 45 && 'full') || 'full';
  const sizeImage = (size === 25 && 250) || (size === 35 && 350) || (size === 45 && 450) || 450;

  return (
    <figure className={cn(`relative flex items-center justify-center pb-[100%] h-0`, className)}>
      <Image
        src={src}
        alt={alt || 'Pizza image'}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-${sizeClassName} w-${sizeClassName} rounded-full object-cover object-center transition-all z-10 duration-300`}
        width={sizeImage}
        height={sizeImage}
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full border-dashed border-2 border-slate-500  w-1/2 h-1/2">
        <span className="inline-block absolute left-1/2 top-0 -translate-x-1/2">25</span>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 border-slate-500 rounded-full w-3/4 h-3/4">
        <span className="inline-block absolute left-1/2 top-0 -translate-x-1/2">35</span>
      </div>
      <div className="absolute inset-0 border-dashed border-2 border-slate-500 rounded-full w-full h-full">
        <span className="inline-block absolute left-1/2 top-0 -translate-x-1/2">45</span>
      </div>
    </figure>
  );
};
