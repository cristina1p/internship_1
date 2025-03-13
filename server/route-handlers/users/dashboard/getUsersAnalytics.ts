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

    const response: UserAnalyticsResponse = {
      totalUsers: users.length,
      roles: roles.length > 0 ? roles : [],
    }

    res.status(200).json(response)
  }
