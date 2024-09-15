import { z } from 'zod';

const passwordSchema = z.string().min(3, { message: 'Password is less then 6 symbols' });

export const formLoginSchema = z.object({
  email: z.string().email({ message: 'Email is incorrect' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z.string().min(2, { message: 'Input full name' }),
      confirmPassword: passwordSchema,
    }),
  )
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormLoginValues = z.infer<typeof formLoginSchema>;
export type FormRegisterValues = z.infer<typeof formRegisterSchema>;
