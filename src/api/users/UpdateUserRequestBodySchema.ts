import { GenderOptions, RoleOptions } from '@models/users'
import { z } from 'zod'

export type UpdateUserFormValues = z.infer<
  typeof UpdateUserByIdRequestBodySchema
>

export const UpdateUserByIdRequestBodySchema = z
  .object({
    firstName: z.string().min(1, 'First name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional(),
    gender: z.enum(GenderOptions, { message: 'Invalid gender' }).optional(),
    role: z.enum(RoleOptions, { message: 'Invalid role' }).optional(),
  })
  .strict()
