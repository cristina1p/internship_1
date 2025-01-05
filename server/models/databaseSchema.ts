import { Post } from 'src/models'

import { DbUser } from './dbUser'

export interface DatabaseSchema {
  users: DbUser[]
  posts: Post[]
}
