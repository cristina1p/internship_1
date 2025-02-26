import { UpdatePostFormValues } from '@api/posts'
import { Post } from '@models/posts'

import { api } from '../axios'

type UpdatePostRequest = Pick<Post, 'id'> & UpdatePostFormValues

export const updatePost = async (params: UpdatePostRequest): Promise<Post> => {
  const { id, ...requestBody } = params
  const response = await api.put(`/posts/${id}`, requestBody)
  return response.data
}
