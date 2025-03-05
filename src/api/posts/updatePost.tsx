import { UpdatePostFormValues } from '@api/posts'
import { filterEmptyParams } from '@helper/filterEmptyParams'
import { Post } from '@models/posts'

import { api } from '../axios'

type UpdatePostRequest = Pick<Post, 'id'> & UpdatePostFormValues

export const updatePost = async (params: UpdatePostRequest): Promise<Post> => {
  const { id, ...requestBody } = params

  const filteredBody = filterEmptyParams(requestBody)

  const response = await api.put(`/posts/${id}`, filteredBody)
  return response.data
}
