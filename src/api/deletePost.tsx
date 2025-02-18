import { api } from '@api/axios'

export const deletePost = async (postId: string) => {
  await api.delete(`/posts/${postId}`)
}
