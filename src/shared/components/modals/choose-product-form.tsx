import { cn } from '@/shared/lib/utils';
import { ProductImage, Title } from '../shared';
import { Button, EURO } from '../ui';

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  loading?: boolean;
  onSubmit: () => void;
  className?: string;
}

export const ChooseProductForm = ({
  imageUrl,
  name,
  price,
  loading,
  onSubmit,
  className,
}: Props) => {
  return (
    <div className={cn('grid grid-cols-[minmax(200px,455px)_1fr] gap-4 m-auto ', className)}>
      <div className="p-2 self-center">
        <ProductImage src={imageUrl} alt={name} />
      </div>

      <div
        className={cn('p-7 bg-[#f5f5f5]', {
          'pointer-events-none': loading,
        })}
      >
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">Some kind of composition</p>

        <Button
          loading={loading}
          onClick={onSubmit}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart {price} <EURO />
        </Button>
      </div>
    </div>
  );
};
