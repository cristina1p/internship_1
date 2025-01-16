import { isAuthorized, respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { searchablePostFields } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'

// Zod schema for validating query parameters for getting posts
const GetPostsQuerySchema = z.object({
  search: z.string().optional(),
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

// Route handler for getting posts
export const getPosts =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response) => {
    const {
      user: { id: userId, role },
      query,
    } = req as RequestWithUser

    // Parse and validate the query using the Zod schema
    const result = GetPostsQuerySchema.safeParse(query)
    if (!result.success) {
      // Handle validation error
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    // Destructure validated query parameters
    const { search, start, end } = result.data

    // Apply a single .filter() to combine all conditions
    const filteredPosts = router.db
      .get('posts')
      .filter((post) => {
        // Role-based filtering
        const matchesRole = !isAuthorized(role, userId, post.userId)

        const matchesStart = !start || new Date(post.date) >= new Date(start)

        const matchesEnd = !end || new Date(post.date) <= new Date(end)

        // Search filtering
        const matchesSearch =
          !search ||
          searchablePostFields.some((field) =>
            post[field].toLowerCase().includes(search.toLowerCase()),
          )

        // Combine all conditions
        return matchesRole && matchesStart && matchesEnd && matchesSearch
      })
      .value()

    // Return the filtered posts in the response
    res.status(200).json({ posts: filteredPosts })
  }
