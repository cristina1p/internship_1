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

    const {
      search: searchQuery,
      role: rolesQuery,
      start: startQuery,
      end: endQuery,
    } = result.data

    const users = router.db.get('users').value()

    const filteredUsers = users.filter((user) => {
      const matchesStart = startQuery
        ? new Date(user.createdAt) >= new Date(startQuery)
        : true // If no start query, include all users
      const matchesEnd = endQuery
        ? new Date(user.createdAt) <= new Date(endQuery)
        : true // If no end query, include all users

      const matchesSearch =
        !searchQuery || // If no search query, include all users
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesRole =
        !rolesQuery || // If no roles query, include all users
        rolesQuery.includes(user.role)

      return matchesEnd && matchesStart && matchesSearch && matchesRole // All criteria must match
    })

    res.status(200).json({ users: filteredUsers.map(convertDbUserToUser) })
  }
