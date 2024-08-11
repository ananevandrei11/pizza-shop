import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const SortPopup = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'inline-flexitems-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
        className,
      )}
    ></div>
  );
};
