import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

const CategoriesList = ['Pizza', 'Combos', 'Snakes', 'Cocktails', 'Coffee', 'Drinks', 'Deserts'];
const activeIndex = 0;

export const Categories = ({ className }: Props) => {
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
      {CategoriesList.map((category, index) => (
        <a
          href="/"
          key={category}
          className={cn('flex items-center font-bold h-11 rounded-2xl px-5', {
            'bg-white shadow-md shadow-gray-200 text-primary': index === activeIndex,
          })}
        >
          <span>{category}</span>
        </a>
      ))}
    </div>
  );
};
