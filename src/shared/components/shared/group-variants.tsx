'use client';
import { cn } from '@/shared/lib/utils';

export type Variant<T> = {
  name: string;
  value: T;
  disabled?: boolean;
};

interface Props<T extends string | number> {
  items: Variant<T>[];
  onClick?: (value: T) => void;
  value?: T;
  className?: string;
}

export const GroupVariants = <T extends string | number>({
  items,
  value,
  onClick,
  className,
}: Props<T>) => {
  return (
    <div className={cn(className, 'flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none')}>
      {items.map(item => (
        <button
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            'flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
            {
              'bg-white shadow': item.value === value,
              'text-gray-500 opacity-50 pointer-events-none': item.disabled,
            },
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
