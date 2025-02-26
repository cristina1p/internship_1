import { StatusOptions } from '@models/posts'
import { z } from 'zod'

export type UpdatePostFormValues = z.infer<typeof UpdatePostRequestBodySchema>

export const UpdatePostRequestBodySchema = z
  .object({
    title: z.string(),
    description: z.string(),
    image: z.string().url('Invalid image URL'),
    status: z.enum(StatusOptions),
  })
  .strict()
