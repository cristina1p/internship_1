import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'

import { respondWithError } from '../../helper'
import { DatabaseSchema, convertDbUserToUser } from '../../models'
import { RequestWithUser } from '../authenticateJwt'

const roleEnum = z.enum(['Admin', 'Moderator', 'User'], {
  message: 'Invalid role',
})

const GetUsersQuerySchema = z.object({
  search: z.string().optional(),
  role: z
    .union([
      roleEnum.transform((role) => [role]), // /users?role=Admin
      z.array(roleEnum), // /users?role=Admin&role=Moderator
    ])
    .optional(),
  start: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid start date (must be in ISO 8601 format)',
    })
    .optional(),
  end: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid end date (must be in ISO 8601 format)',
    })
    .optional(),
})

export const getUsers =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response) => {
    const user = (req as RequestWithUser).user

    if (user.role !== 'Admin') {
      return respondWithError(res, 403, 'Forbidden')
    }

    const result = GetUsersQuerySchema.safeParse(req.query)
    if (!result.success) {
      // Handle validation error
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    const { search, role, start, end } = result.data

    const users = router.db.get('users').value()

    const filteredUsers = users.filter((user) => {
      const matchesStart = start
        ? new Date(user.createdAt) >= new Date(start)
        : true // If no start query, include all users
      const matchesEnd = end ? new Date(user.createdAt) <= new Date(end) : true // If no end query, include all users

      const matchesSearch =
        !search || // If no search query, include all users
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())

      const matchesRole =
        !role || // If no roles query, include all users
        role.includes(user.role)

      return matchesEnd && matchesStart && matchesSearch && matchesRole // All criteria must match
    })

    res.status(200).json({ users: filteredUsers.map(convertDbUserToUser) })
  }
