'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Textarea } from '../../ui/textarea';
import { ClearButton, ErrorText } from '../../ui';
import { cn } from '@/shared/lib/utils';

interface Props {
  name: string;
  rows?: number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea = ({ className, name, label, required, rows = 5, ...props }: Props) => {
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
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </p>

      <div className="relative">
        <Textarea
          rows={rows}
          className={cn('h-12 text-md', {
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
