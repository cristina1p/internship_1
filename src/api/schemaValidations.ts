import { GenderOptions } from '@models/users'
import { z } from 'zod'

// Zod schema, validates the structure of the request body
export const LoginRequestBodySchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const RegisterRequestBodySchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters long'),
    gender: z.enum(GenderOptions, {
      message: 'Invalid gender',
    }),
    termsAndConditions: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Error will be attached to confirmPassword
  })
