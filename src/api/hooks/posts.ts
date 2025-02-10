import { api } from '@api/axios'
import { filterEmptyParams } from '@helper/filterEmptyParams'
import { GetPostResponse } from '@models/auth'

type GetPostsQueryKey = [
  string,
  {
    status?: string
    start?: string
    end?: string
    search?: string
  },
]

export const getPosts = async ({
  queryKey,
}: {
  queryKey: GetPostsQueryKey
}) => {
  const [, params] = queryKey

  const filteredParams = filterEmptyParams(params)
  const response = await api.get<GetPostResponse>('posts', {
    params: filteredParams,
  })

  return response.data
}
