import { api } from '@api/axios'
import { GetAccountResponse } from '@models/auth'

export const getAccount = async () => {
  const response = await api.get<GetAccountResponse>('account')
  return response.data
}
