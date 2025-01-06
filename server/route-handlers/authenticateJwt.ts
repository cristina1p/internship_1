import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Role } from 'src/models'

import { config } from '../config'
import { respondWithError } from '../helper'

export interface RequestWithUser extends Request {
  user: JwtUserPayload
}

export type JwtUserPayload = {
  id: number
  email: string
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
