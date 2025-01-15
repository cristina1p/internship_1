import { Role } from '@models/users'

export const isAuthorized = (
  role: Role,
  userId: number,
  postUserId: number,
): boolean => {
  return role === 'Admin' || role === 'Moderator' || postUserId === userId
}
