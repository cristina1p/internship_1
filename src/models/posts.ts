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

export type SortOrder = 'asc' | 'desc'

export const Sort: ['asc', 'desc'] = ['asc', 'desc']

export interface GetPostsResponse {
  posts: Post[]
  total: number
}
