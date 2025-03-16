import { UserAnalyticsResponse } from '@models/auth'
import { Role } from '@models/users'
import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers/authenticateJwt'
import { Response, Request } from 'express'
import jsonServer from 'json-server'

export const getUsersAnalytics =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response<UserAnalyticsResponse>) => {
    const { user } = req as RequestWithUser

    if (user.role !== 'Admin') {
      return respondWithError(
        res,
        403,
        'You are not authorized to access this resource',
      )
    }

    const users = router.db.get('users').value() || []

    // Get the date for 7 days ago
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Count users before 7 days ago
    const previousTotalUsers = users.filter(
      (user) => new Date(user.createdAt) < sevenDaysAgo,
    ).length

    const countByRole: Record<Role, number> = {
      Admin: 0,
      Moderator: 0,
      User: 0,
    }

    const rolesCount = users.reduce((acc, user) => {
      acc[user.role]++
      return acc
    }, countByRole)

    // Transform object into array
    const roles = Object.entries(rolesCount).map(([role, count]) => ({
      role: role as Role,
      count,
    }))

    // Construct the response
    const response: UserAnalyticsResponse = {
      totalUsers: users.length,
      previousTotalUsers,
      roles: roles.length > 0 ? roles : [],
    }

    res.status(200).json(response)
  }
