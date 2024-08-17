import { cn } from '@/lib/utils';
import { INGREDIENTS } from '@/config/constants/mockData';

import { Input } from '../ui';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { CheckboxFIltersGroup } from './checkbox-filters-group';

interface Props {
  className?: string;
}

export const Filters = ({ className }: Props) => {
  return (
    <div className={cn('', className)}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="You can choose" value="1" />
        <FilterCheckbox text="New products" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from and to</p>
        <div className="flex gap-3 mb-5">
          <Input type="number" placeholder="0" min={0} max={100} defaultValue={0} />
          <Input type="number" placeholder="100" min={10} max={100} />
        </div>

        <RangeSlider min={0} max={100} step={5} value={[0, 100]} />
      </div>

      <CheckboxFIltersGroup
        title="Ingredients"
        className="mt-5"
        limit={6}
        defaultItems={INGREDIENTS}
        items={INGREDIENTS}
        searchInputPlaceholder="Search..."
      />
    </div>
  );
};
