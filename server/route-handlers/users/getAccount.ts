import { GetAccountResponse } from '@models/auth'
import { respondWithError } from '@server/helper'
import { DatabaseSchema, convertDbUserToUser } from '@server/models'
import { RequestWithUser } from '@server/route-handlers'
import { Response, Request } from 'express'
import jsonServer from 'json-server'

export const getAccount =
  (router: jsonServer.JsonServerRouter<DatabaseSchema>) =>
  (req: Request, res: Response) => {
    const {
      user: { id },
    } = req as RequestWithUser

    const dbUser = router.db.get('users').find({ id }).value()
    if (!dbUser) {
      return respondWithError(res, 404, 'User not found')
    }

    res
      .status(200)
      .json({ userDetails: convertDbUserToUser(dbUser) } as GetAccountResponse)
  }
