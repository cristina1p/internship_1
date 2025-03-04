import { api } from '@api/axios'
import { AddUserFormValues } from '@api/users/AddUserRequestBodySchema'
import { User } from '@models/users'

export const addUser = async (params: AddUserFormValues): Promise<User> => {
  const response = await api.post<User>('./users', params)
  return response.data
}
