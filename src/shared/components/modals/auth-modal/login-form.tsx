'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { cn } from '@/shared/lib/utils';
import { formLoginSchema, FormLoginValues } from '@/shared/constants/login-schema';
import { FormInput, Title } from '../../shared';
import { Button } from '../../ui';
import { Smartphone } from 'lucide-react';
import { signIn } from 'next-auth/react';

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const LoginForm = ({ className }: Props) => {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormLoginValues) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!response) {
        throw new Error('Something went wrong');
      }

      if (!response.ok) {
        throw new Error(response.error + ' ' + response.status);
      }

      toast.success('Success log in');
    } catch (error) {
      console.error(error);
      const messageError = error instanceof Error ? error.message : String(error);
      toast.error(messageError);
    }
  };

  return (
    <FormProvider {...form}>
      <form className={cn('flex flex-col gap-5', className)} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Enter your email to log in to your account</p>
          </div>
          <Smartphone width={60} height={60} />
        </div>
        <FormInput name="email" className="text-base" placeholder="Email" label="Email" />
        <FormInput
          name="password"
          className="text-base"
          placeholder="Password"
          label="Password"
          type="password"
        />
        <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
          Enter
        </Button>
      </form>
    </FormProvider>
  );
};
