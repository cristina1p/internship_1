import { api } from '@api/axios'
import { PostAnalyticsResponse } from '@models/auth'

export const getPostsAnalytics = async () => {
  const response = await api.get<PostAnalyticsResponse>('/posts/analytics')
  return response.data
}
