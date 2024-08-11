import { ReactNode } from 'react';
import { Checkbox } from '../ui';

interface Props {
  text: string;
  value: string;
  children?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

export const FilterCheckbox = ({ text, value, children, onCheckedChange, checked }: Props) => {
  const id = `checkbox-${String(value).toLowerCase()}`;

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        className="rounded-[8px] w-6 h-6"
        id={id}
      />
      <label htmlFor={id} className="leading-none cursor-pointer flex-1">
        {text}
      </label>
      {children}
    </div>
  );
};
