import { GetUsersResponse, RoleOptions, User } from '@models/users'
import { respondWithError } from '@server/helper'
import { DatabaseSchema, searchableUserFields } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'

const roleEnum = z.enum(RoleOptions, { message: 'Invalid role' })

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
  page: z
    .string()
    .optional()
    .transform((val) => Number(val) || 0)
    .pipe(z.number().int().min(0)),
  limit: z
    .string()
    .optional()
    .transform((val) => Number(val) || 10)
    .pipe(z.number().int().min(1)),
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

    const { search, role, start, end, page, limit } = result.data

    const filteredUsers = router.db
      .get('users')
      .filter((user) => {
        const matchesStart =
          !start || new Date(user.createdAt) >= new Date(start)
        const matchesEnd = !end || new Date(user.createdAt) <= new Date(end)

        const matchesSearch =
          !search ||
          searchableUserFields.some((field) =>
            user[field].toLowerCase().includes(search.toLowerCase()),
          )

        const matchesRole =
          !role || // If no roles query, include all users
          role.includes(user.role)

        return matchesEnd && matchesStart && matchesSearch && matchesRole // All criteria must match
      })
      .sortBy((user) => -new Date(user.createdAt))
      .value()

    // Calculate paginated and total count
    const offset = page * limit
    const paginatedUsers = filteredUsers.slice(offset, offset + limit)

    res.status(200).json({
      users: paginatedUsers as User[],
      total: filteredUsers.length,
    } as GetUsersResponse)
  }
