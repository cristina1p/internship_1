import { GenderOptions, RoleOptions } from '@models/users'
import { respondWithError } from '@server/helper'
import { DatabaseSchema, convertDbUserToUser } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Response, Request } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'

const UpdateUserByIdRequestBodySchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
  gender: z.enum(GenderOptions, { message: 'Invalid gender' }).optional(),
  role: z.enum(RoleOptions, { message: 'Invalid role' }).optional(),
})

export const updateUserById =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response) => {
    // Extract the authenticated user from the request
    const { user, params } = req as RequestWithUser
    const userId = parseInt(params.id) // Extract the user ID from the request URL

    if (user.role !== 'Admin' && user.id !== userId) {
      return respondWithError(res, 403, 'Forbidden')
    }

    const dbUsers = router.db.get('users')
    const userQuery = dbUsers.find({ id: userId }) // Store the query result
    // Find the user by ID in the database
    const dbUser = userQuery.value()

    // If no user is found, return a 404 error
    if (!dbUser) {
      return respondWithError(res, 404, 'User not found')
    }

    // Validate the incoming request body against the zod schema
    const result = UpdateUserByIdRequestBodySchema.safeParse(req.body)
    if (!result.success) {
      // Handle validation errors
      const errors = result.error.flatten()
      return respondWithError(res, 400, 'Validation failed', errors.fieldErrors)
    }

    if (result.data.role && user.role !== 'Admin') {
      return respondWithError(res, 403, 'Forbidden')
    }

    // Update the user object in the database
    const updatedDbUser = userQuery
      .assign({ ...dbUser, ...result.data })
      .write()

    // Return the updated user data
    res.status(200).json(convertDbUserToUser(updatedDbUser))
  }
