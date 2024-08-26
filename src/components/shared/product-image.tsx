/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt?: string;
  className?: string;
}

export const ProductImage = ({ src, alt, className }: Props) => {
  return (
    <figure className={cn(`relative flex items-center justify-center pb-[100%] h-0`, className)}>
      <Image
        src={src}
        alt={alt || 'Product image'}
        className="absolute w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block rounded-full object-cover object-center"
        width="455"
        height="455"
      />
    </figure>
  );
};
