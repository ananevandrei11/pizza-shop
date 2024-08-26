import { cn } from '@/lib/utils';
import { Ingredient, ProductItem } from '@prisma/client';
import { PizzaImage, Title } from '../shared';
import { Button, EURO } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePIzzaForm = ({
  imageUrl,
  name,
  // ingredients,
  // items,
  // onSubmit,
  // loading,
  className,
}: Props) => {
  return (
    <div className={cn('grid grid-cols-[minmax(200px,455px)_1fr] gap-4 m-auto ', className)}>
      <div className="p-2 self-center">
        <PizzaImage src={imageUrl} alt={name} size={25} />
      </div>

      <div className="p-7 bg-[#f5f5f5]">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">Some kind of composition</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Add to cart <EURO />
        </Button>
      </div>
    </div>
  );
};
