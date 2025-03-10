import { UpdateAccountDetailsRequestBodySchema } from '@api/settings'
import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { Request, Response } from 'express'
import jsonServer from 'json-server'

import { RequestWithUser } from '../authenticateJwt'

export const updateAccountDetails =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response): void => {
    const result = UpdateAccountDetailsRequestBodySchema.safeParse(req.body)

    if (!result.success) {
      // Handle validation errors
      const errors = result.error.flatten().fieldErrors
      respondWithError(res, 400, 'Validation failed', errors)
      return
    }

    // Extract validated data
    const { firstName, lastName, gender } = result.data

    // Extract userId from JWT
    const userId = (req as RequestWithUser).user.id

    const userQuery = router.db.get('users').find({ id: userId })
    const dbUser = userQuery.value()

    if (!dbUser) {
      return respondWithError(res, 404, 'User not found')
    }

    // Update the user details
    const updatedUser = { ...dbUser, firstName, lastName, gender }

    userQuery.assign(updatedUser).write()

    res.status(200).json(updatedUser)
  }
