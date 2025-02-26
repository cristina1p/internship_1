import { z } from 'zod'

export type CreatePostFormValues = z.infer<typeof CreatePostRequestBodySchema>

export const CreatePostRequestBodySchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    image: z.string().url('Invalid image URL'),
  })
  .strict()
