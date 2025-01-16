import { Post } from '@models/posts'
import { isAuthorized, respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Request, Response } from 'express'
import jsonServer from 'json-server'

export const getPostById =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response): void => {
    const { id: userId, role } = (req as RequestWithUser).user // Extract user information from the JWT
    const postId = parseInt(req.params.id) // Get the post ID from the request parameters

    const existingPosts = router.db.get('posts')
    const existingPost = existingPosts.find({ id: postId }).value() as
      | Post
      | undefined

    if (!existingPost) {
      return respondWithError(res, 404, 'Post not found')
    }

    if (!isAuthorized(role, userId, existingPost.userId)) {
      return respondWithError(
        res,
        403,
        'Forbidden: You can only access your own posts',
      )
    }

    // Return the post if the user is allowed
    res.status(200).json(existingPost)
  }
