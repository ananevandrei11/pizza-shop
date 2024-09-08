import { cn } from '@/shared/lib/utils';
import { ClearButton, ErrorText, Input, RequiredSymbol } from '../../ui';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({ name, label, placeholder, required, className, ...props }: Props) => {
  const {
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const error = errors[name];

  const handleClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={cn('relative flex flex-col', className)}>
      {label && (
        <label htmlFor={name} className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </label>
      )}
      <div className="relative">
        <Input
          id={name}
          required={required}
          placeholder={placeholder}
          className={cn('text-base', {
            ['opacity-50']: isSubmitting,
          })}
          disabled={isSubmitting}
          {...register(name)}
          {...props}
        />
        {value && <ClearButton onClick={handleClear} />}
      </div>
      {error && <ErrorText text={<>{error.message}</>} className="mt-2" />}
    </div>
  );
};
