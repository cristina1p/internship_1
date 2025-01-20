import { api } from '@api/axios'
import { GetAccountResponse } from '@models/auth'

export const getAccount = () => api.get<GetAccountResponse>('account')
