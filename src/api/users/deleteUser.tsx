import { api } from '@api/axios'

export const deleteUser = async (userId: string) => {
  console.log(userId)
  await api.delete(`/users/${userId}`)
}
