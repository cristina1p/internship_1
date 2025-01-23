import { Role } from '@models/users'
import { config } from '@server/config'
import { respondWithError } from '@server/helper'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface RequestWithUser extends Request {
  user: JwtUserPayload
}

export type JwtUserPayload = {
  id: number
  role: Role
}

export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers['authorization']?.split(' ')[1] // Extract token from 'Authorization' header

  if (!token) {
    // Forbidden if no token is found
    return respondWithError(res, 401, 'Invalid or expired token')
  }

  jwt.verify(token, config.jwtSecretKey, (err, user) => {
    if (err) {
      // Forbidden if token is invalid or expired
      return respondWithError(res, 401, 'Invalid or expired token')
    }

    ;(req as RequestWithUser).user = user as JwtUserPayload // Attach the user information (payload) to the request object
    next() // Call the next middleware or route handler
  })
}
