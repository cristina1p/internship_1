import { filterEmptyParams } from '@helper/filterEmptyParams'
import { GetUsersResponse } from '@models/users'

import { api } from '../axios'

type GetUsersQueryKey = [
  string,
  { search?: string; page?: number; limit?: number },
]

export const fetchUsers = async ({
  queryKey,
}: {
  queryKey: GetUsersQueryKey
}) => {
  const [, params] = queryKey

  const filteredParams = filterEmptyParams(params)
  const response = await api.get<GetUsersResponse>('/users', {
    params: filteredParams,
  })
  return response.data
}
