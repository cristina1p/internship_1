import { RegisterRequestBodySchema } from '@api/schemaValidations'
import { RoleOptions } from '@models/users'
import { z } from 'zod'

export type AddUserFormValues = z.infer<typeof AddUserRequestBodySchema>

export const AddUserRequestBodySchema = RegisterRequestBodySchema._def.schema
  .omit({
    termsAndConditions: true,
  })
  .extend({
    role: z.enum(RoleOptions),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })
