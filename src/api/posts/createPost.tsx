import { api } from '@api/axios'
import { CreatePostFormValues } from '@api/posts'
import { Post } from '@models/posts'

type CreatePostRequest = CreatePostFormValues

export const createPost = async (params: CreatePostRequest): Promise<Post> => {
  const response = await api.post<Post>('/posts', params)
  return response.data
}
