import { respondWithError } from '@server/helper'
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
    const dbPosts = router.db.get('posts')
    const dbPost = dbPosts.find({ id: postId }).value() as Post | undefined

    if (!dbPost) {
      return respondWithError(res, 404, 'Post not found')
    }

    if (role !== 'Admin' && role !== 'Moderator' && dbPost.userId !== userId) {
      return respondWithError(
        res,
        403,
        'Forbidden: You can only delete your own posts',
      )
    }

    // Delete the post from the database
    dbPosts.remove({ id: postId }).write()

    // Respond with success message
    res.status(200).json({ message: 'Post deleted successfully' })
  }
}
