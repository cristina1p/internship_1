import { isAuthorized, respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { Post } from 'src/models'

export const deletePost = (
  router: jsonServer.JsonServerRouter<DatabaseSchema>,
) => {
  return (req: Request, res: Response) => {
    const { id: userId, role } = (req as RequestWithUser).user // Extract user info from JWT
    const postId = parseInt(req.params.id) // Extract post ID from route parameter

    // Get the database and find the post
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
        'Forbidden: You can only delete your own posts',
      )
    }

    // Delete the post from the database
    existingPosts.remove({ id: postId }).write()

    // Respond with success message
    res.status(200).json({ message: 'Post deleted successfully' })
  }
}
