import { ChangePasswordRequestBodySchema } from '@api/settings'
import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'

export type ChangePasswordBodySchema = z.infer<
  typeof ChangePasswordRequestBodySchema
>

export const changePassword =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response): void => {
    const result = ChangePasswordRequestBodySchema.safeParse(req.body)

    if (!result.success) {
      // Handle validation errors
      const errors = result.error.flatten().fieldErrors
      respondWithError(res, 400, 'Validation failed', errors)
      return
    }

    // Extract validated data
    const { oldPassword, newPassword } = result.data
    const { user } = req as RequestWithUser

    // Check if user exists
    const userQuery = router.db.get('users').find({ id: user.id })
    const dbUser = userQuery.value()

    if (!dbUser) {
      respondWithError(res, 400, 'User not found')
      return
    }

    // Verify the password
    const passwordIsValid = bcrypt.compareSync(oldPassword, dbUser.password)
    if (!passwordIsValid) {
      respondWithError(res, 401, 'Incorrect password. Please try again.')
      return
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(newPassword, 10)

    userQuery.assign({ password: hashedPassword }).write()

    // Send success response
    res.status(200).json({ message: 'Password updated successfully' })
  }
