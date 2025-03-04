import { AddUserRequestBodySchema } from '@api/users'
import { findUserByEmail, respondWithError } from '@server/helper'
import { DatabaseSchema, DbUser, convertDbUserToUser } from '@server/models'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jsonServer from 'json-server'

export const addUser = (
  router: jsonServer.JsonServerRouter<DatabaseSchema>,
) => {
  return (req: Request, res: Response) => {
    const result = AddUserRequestBodySchema.safeParse(req.body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    const {
      firstName,
      lastName,
      email,
      gender,
      password,
      confirmPassword,
      role,
    } = result.data

    // Check if passwords match (though Zod already validates this)
    if (password !== confirmPassword) {
      return respondWithError(res, 400, "Passwords don't match")
    }

    // Check if user already exists
    const dbUsers = router.db.get('users').value()
    const dbUser = findUserByEmail(dbUsers, email)
    if (dbUser) {
      return respondWithError(res, 400, 'User with this email already exists')
    }

    // Hash the password (if provided) or generate a random one
    const hashedPassword = password
      ? bcrypt.hashSync(password, 10)
      : bcrypt.hashSync('Default123!', 10)

    // Create new user
    const newDbUser: DbUser = {
      id: dbUsers.length + 1,
      firstName,
      lastName,
      email,
      gender,
      role, // Admin can set the role
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      profileImage: '',
    }

    // Save to database
    router.db.get('users').push(newDbUser).write()

    res.status(201).json(convertDbUserToUser(newDbUser))
  }
}
