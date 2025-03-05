export interface User {
  id: number // Unique identifier
  firstName: string // User's first name
  lastName: string // User's last name
  email: string // User's email address
  gender: Gender // Gender selection
  role: Role // User role
  profileImage: string
}

export type Gender = 'Male' | 'Female' | 'Prefer Not to Say'
export type Role = 'Admin' | 'Moderator' | 'User'

export const GenderOptions: ['Male', 'Female', 'Prefer Not to Say'] = [
  'Male',
  'Female',
  'Prefer Not to Say',
]

export const RoleOptions: ['Admin', 'Moderator', 'User'] = [
  'Admin',
  'Moderator',
  'User',
]

export const Sort: ['asc', 'desc'] = ['asc', 'desc']

export interface GetUsersResponse {
  users: User[]
  total: number
}
