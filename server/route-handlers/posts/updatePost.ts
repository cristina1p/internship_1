import { UpdatePostRequestBodySchema } from '@api/posts'
import { respondWithError } from '@server/helper'
import { isAuthorized } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { Post } from 'src/models'

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
    const existingPosts = router.db.get('posts')
    const postQuery = existingPosts.find({ id: postId }) // Store the query result
    const existingPost = postQuery.value() as Post | undefined

    if (!existingPost) {
      return respondWithError(res, 404, 'Post not found')
    }

    if (!isAuthorized(role, userId, existingPost.userId)) {
      return respondWithError(
        res,
        403,
        'Forbidden: You can only update your own posts',
      )
    }

    // Update the post
    const updatedPost = postQuery
      .assign({ ...existingPost, ...result.data })
      .write()

    // Respond with the updated post
    res.status(200).json(updatedPost)
  }
}
