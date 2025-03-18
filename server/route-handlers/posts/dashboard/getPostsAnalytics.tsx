import { PostAnalyticsResponse } from '@models/auth'
import { Status } from '@models/posts'
import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers/authenticateJwt'
import { Response, Request } from 'express'
import jsonServer from 'json-server'

export const getPostsAnalytics =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response<PostAnalyticsResponse>) => {
    const { user } = req as RequestWithUser

    if (user.role !== 'Moderator' && user.role !== 'Admin') {
      return respondWithError(
        res,
        403,
        'You are not authorized to access this resource',
      )
    }

    const posts = router.db.get('posts').value() || []

    // Get the date for 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Count posts before 7 days ago
    const previousTotalPosts = posts.filter(
      (post) => new Date(post.createdAt) < sevenDaysAgo,
    ).length

    const countByStatus: Record<Status, number> = {
      Draft: 0,
      Published: 0,
      Deleted: 0,
    }

    const statusCount = posts.reduce((acc, post) => {
      acc[post.status]++
      return acc
    }, countByStatus)

    // Transform object into array
    const statuses = Object.entries(statusCount).map(([status, count]) => ({
      status: status as Status,
      count,
    }))

    const response: PostAnalyticsResponse = {
      totalPosts: posts.length,
      statuses: statuses.length > 0 ? statuses : [],
      previousTotalPosts,
    }

    res.status(200).json(response)
  }
