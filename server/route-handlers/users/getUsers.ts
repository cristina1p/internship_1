import { respondWithError } from '@server/helper'
import {
  DatabaseSchema,
  SearchableField,
  convertDbUserToUser,
} from '@server/models'
import { RequestWithUser } from '@server/route-handlers/authenticateJwt'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'


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
    const { user, query } = req as RequestWithUser

    if (user.role !== 'Admin') {
      return respondWithError(res, 403, 'Forbidden')
    }

    const result = GetUsersQuerySchema.safeParse(query)
    if (!result.success) {
      // Handle validation error
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    const { search, role, start, end } = result.data
    const users = router.db.get('users').value()

    const filteredUsers = users.filter((user) => {
      // If no start/end query, include all users
      const matchesStart = !start || new Date(user.createdAt) >= new Date(start)
      const matchesEnd = !end || new Date(user.createdAt) <= new Date(end)

      const matchesSearch =
        !search ||
        (['firstName', 'lastName', 'email'] as SearchableField[]).some(
          (field) => user[field].toLowerCase().includes(search.toLowerCase()),
        )

      const matchesRole =
        !role || // If no roles query, include all users
        role.includes(user.role)

      return matchesEnd && matchesStart && matchesSearch && matchesRole // All criteria must match
    })

    res.status(200).json({ users: filteredUsers.map(convertDbUserToUser) })
  }
