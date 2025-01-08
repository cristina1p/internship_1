import { Post } from '@models/posts'
import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { Request, Response } from 'express'
import jsonServer from 'json-server'

import { RequestWithUser } from '../authenticateJwt'

export const getPostById =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response): void => {
    const { id, role } = (req as RequestWithUser).user // Extract user information from the JWT
    const postId = parseInt(req.params.id) // Get the post ID from the request parameters

    const dbPosts = router.db.get('posts')
    const dbPost = dbPosts.find({ id: postId }).value() as Post | undefined

    if (!dbPost) {
      return respondWithError(res, 404, 'Post not found')
    }

    if (role !== 'Admin' && role !== 'Moderator' && dbPost.userId !== id) {
      return respondWithError(
        res,
        403,
        'Forbidden: You can only access your own posts',
      )
    }

    // Return the post if the user is allowed
    res.status(200).json(dbPost)
  }
