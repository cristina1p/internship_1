import { Post } from '@models/posts'
import { DbUser } from '@server/models/dbUser'

export interface DatabaseSchema {
  users: DbUser[]
  posts: Post[]
}
