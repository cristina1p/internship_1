import { z } from 'zod'

export type ChangePasswordFormValues = z.infer<
  typeof ChangePasswordRequestBodySchema
>

export const ChangePasswordRequestBodySchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, { message: 'Old password must be at least 6 characters' }),
    newPassword: z
      .string()
      .min(6, { message: 'New password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // Error will be attached to confirmPassword
  })
