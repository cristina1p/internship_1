import { Post } from '@models/posts'

import { DbUser } from './dbUser'

export interface DatabaseSchema {
  users: DbUser[]
  posts: Post[]
}
