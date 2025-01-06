import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { Post } from 'src/models'
import { z } from 'zod'

import { respondWithError } from '../../helper'
import { DatabaseSchema } from '../../models'
import { RequestWithUser } from '../authenticateJwt'

// Zod schema for validating updates
const UpdatePostRequestBodySchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().url('Invalid image URL').optional(),
})

export const updatePost = (
  router: jsonServer.JsonServerRouter<DatabaseSchema>,
) => {
  return (req: Request, res: Response) => {
    const { id: userId, role } = (req as RequestWithUser).user // Extract user info from JWT
    const postId = parseInt(req.params.id) // Extract post ID from route parameter

    // Validate request body with Zod
    const result = UpdatePostRequestBodySchema.safeParse(req.body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    // Get the database and find the post
    const dbPosts = router.db.get('posts')
    const postQuery = dbPosts.find({ id: postId }) // Store the query result
    const dbPost = postQuery.value() as Post | undefined

    if (!dbPost) {
      return respondWithError(res, 404, 'Post not found')
    }

    if (role !== 'Admin' && role !== 'Moderator' && dbPost.userId !== userId) {
      return respondWithError(
        res,
        403,
        'Forbidden: You can only update your own posts',
      )
    }

    // Update the post
    const updatedPost = postQuery.assign({ ...dbPost, ...result.data }).write()

    // Respond with the updated post
    res.status(200).json(updatedPost)
  }
}
