import { api } from '@api/axios'
import { UpdateUserFormValues } from '@api/users'
import { filterEmptyParams } from '@helper/filterEmptyParams'
import { User } from '@models/users'

type UpdateUserRequest = Pick<User, 'id'> & UpdateUserFormValues

export const updateUser = async (params: UpdateUserRequest): Promise<User> => {
  const { id, ...requestBody } = params

  // Remove undefined values before sending the request
  const filteredBody = filterEmptyParams(requestBody)

  const response = await api.put(`/users/${id}`, filteredBody)
  return response.data
}
