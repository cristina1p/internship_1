import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { Response, Request } from 'express'
import jsonServer from 'json-server'

import { RequestWithUser } from '../authenticateJwt'

export const deleteUserById =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response) => {
    // Extract the authenticated user from the request
    const { user, params } = req as RequestWithUser
    const userId = parseInt(params.id) // Extract the user ID from the request URL

    if (user.role !== 'Admin') {
      return respondWithError(
        res,
        403,
        'Forbidden: Only admins can delete users',
      )
    }

    const dbUsers = router.db.get('users')
    // Find the user by ID in the database
    const dbUser = dbUsers.find({ id: userId }).value()

    // If no user is found, return a 404 error
    if (!dbUser) {
      return respondWithError(res, 404, 'User not found')
    }

    // Delete the user from the database
    dbUsers.remove({ id: userId }).write()

    // Return a success response
    res.status(200).json({ message: 'User deleted successfully' })
  }
