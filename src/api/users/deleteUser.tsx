import { api } from '@api/axios'

export const deleteUser = async (userId: string) => {
  await api.delete(`/users/${userId}`)
}
