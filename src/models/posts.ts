export interface Post {
  id: number
  title: string
  description: string
  image: string
  date: string
  userId: number
  viewCounter?: number
  comments?: string[]
  status: Status
}

export type Status = 'Published' | 'Draft' | 'Deleted'

export const StatusOptions: ['Published', 'Draft', 'Deleted'] = [
  'Published',
  'Draft',
  'Deleted',
]

export interface GetPostsResponse {
  posts: Post[]
  page: number | undefined
  limit: number | undefined
  total: number
  totalPages: number
}
