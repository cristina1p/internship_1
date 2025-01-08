import { respondWithError } from '@server/helper'
import { DatabaseSchema } from '@server/models'
import { Request, Response } from 'express'
import jsonServer from 'json-server'
import { z } from 'zod'

import { RequestWithUser } from '../authenticateJwt'

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
    const { id: userId, role } = (req as RequestWithUser).user

    // Parse and validate the query using the Zod schema
    const result = GetPostsQuerySchema.safeParse(req.query)
    if (!result.success) {
      // Handle validation error
      const errors = result.error.flatten().fieldErrors
      return respondWithError(res, 400, 'Validation failed', errors)
    }

    // Destructure validated query parameters
    const { search, start, end } = result.data

    // Get all posts from the database
    const dbPosts = router.db.get('posts').value()

    // Filter posts based on query parameters
    const filteredPosts = dbPosts.filter((post) => {
      // Filter by date range (start and end)
      const matchesStart = start ? new Date(post.date) >= new Date(start) : true
      const matchesEnd = end ? new Date(post.date) <= new Date(end) : true

      // Filter by search query (search in title, description)
      const matchesSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.description.toLowerCase().includes(search.toLowerCase())

      const matchesRole =
        role === 'Admin' || role === 'Moderator' || post.userId === userId

      // All filters must match for the post to be included
      return matchesStart && matchesEnd && matchesSearch && matchesRole
    })

    // Return the filtered posts in the response
    res.status(200).json({ posts: filteredPosts })
  }
