import { Post } from '@models/posts'

import { api } from './axios'

type UpdatePostRequest = Pick<
  Post,
  'id' | 'title' | 'description' | 'image' | 'status'
>

export const updatePost = async (params: UpdatePostRequest): Promise<Post> => {
  const { id, ...requestBody } = params
  const response = await api.put(`/posts/${id}`, requestBody)
  return response.data
}
