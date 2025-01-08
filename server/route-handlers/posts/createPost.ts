import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { Post } from 'src/models'
import { z } from 'zod'

import { RequestWithUser } from '../authenticateJwt'

// Zod schema to validate the post creation request body
const CreatePostRequestBodySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().url('Invalid image URL'),
})

export const createPost = (
  router: jsonServer.JsonServerRouter<DatabaseSchema>,
) => {
  return (req: Request, res: Response) => {
    const { id: userId } = (req as RequestWithUser).user // Extract authenticated user information from the JWT

    // Validate the request body
    const result = CreatePostRequestBodySchema.safeParse(req.body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    const dbPosts = router.db.get('posts')
    // Create the new post
    const newPost: Post = {
      ...result.data,
      id: dbPosts.value().length + 1,
      userId, // Attach the userId of the authenticated user,
      date: new Date().toISOString(),
      viewCounter: 0,
      comments: [],
    }

    // Add the new post to the database
    dbPosts.push(newPost).write()

    // Respond with the created post
    res.status(201).json(newPost)
  }
}
