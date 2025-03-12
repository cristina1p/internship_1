import { UpdateUserByIdRequestBodySchema } from '@api/users'
import { z } from 'zod'

export type UpdateAccountDetailsFormValues = z.infer<
  typeof UpdateAccountDetailsRequestBodySchema
>

export const UpdateAccountDetailsRequestBodySchema =
  UpdateUserByIdRequestBodySchema.omit({ role: true })
