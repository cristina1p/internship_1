import { api } from '@api/axios'
import { UserAnalyticsResponse } from '@models/auth'

export const getUsersAnalytics = async () => {
  const response = await api.get<UserAnalyticsResponse>('/users/analytics')
  return response.data
}
