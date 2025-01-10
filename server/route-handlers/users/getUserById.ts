import { respondWithError } from '@server/helper'
import { DatabaseSchema, convertDbUserToUser } from '@server/models'
import { RequestWithUser } from '@server/route-handlers/authenticateJwt'
import { Response, Request } from 'express'
import jsonServer from 'json-server'

export const getUserById =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response) => {
    // Extract the authenticated user from the request
    const { user, params } = req as RequestWithUser
    const userId = parseInt(params.id) // Extract the user ID from the request URL

    if (user.role !== 'Admin' && user.id !== userId) {
      return respondWithError(res, 403, 'Forbidden')
    }

    // Find the user by ID in the database
    const dbUser = router.db.get('users').find({ id: userId }).value()

    // If no user is found, return a 404 error
    if (!dbUser) {
      return respondWithError(res, 404, 'User not found')
    }

    // If the user is found and access is allowed, return the user data
    res.status(200).json(convertDbUserToUser(dbUser))
  }
