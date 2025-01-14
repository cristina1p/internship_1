import { Post } from '@models/posts'

export type SearchablePostField = keyof Pick<Post, 'title' | 'description'>

export const searchablePostFields: SearchablePostField[] = [
  'title',
  'description',
]
