import { cn } from '@/shared/lib/utils';
import { EURO } from '../../ui';

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return (
    <h2 className={cn('font-bold', className)}>
      {value} <EURO />
    </h2>
  );
};
