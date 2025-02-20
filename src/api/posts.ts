import { api } from '@api/axios'
import { filterEmptyParams } from '@helper/filterEmptyParams'
import { GetPostsResponse } from '@models/posts'

type GetPostsQueryKey = [
  string,
  {
    status?: string
    start?: string
    end?: string
    search?: string
    page?: number
    limit?: number
    sort?: string
  },
]

export const getPosts = async ({
  queryKey,
}: {
  queryKey: GetPostsQueryKey
}) => {
  const [, params] = queryKey

  const filteredParams = filterEmptyParams(params)
  const response = await api.get<GetPostsResponse>('posts', {
    params: filteredParams,
  })

  return response.data
}
