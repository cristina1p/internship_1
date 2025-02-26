import { CreatePostRequestBodySchema } from '@api/posts/CreatePostRequestBodySchema'
import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { Post } from 'src/models'

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

    const existingPosts = router.db.get('posts')
    // Create the new post
    const newPost: Post = {
      ...result.data,
      id: existingPosts.value().length + 1,
      userId, // Attach the userId of the authenticated user,
      date: new Date().toISOString(),
      viewCounter: 0,
      comments: [],
      status: 'Published',
    }

    // Add the new post to the database
    existingPosts.push(newPost).write()

    // Respond with the created post
    res.status(201).json(newPost)
  }
}
