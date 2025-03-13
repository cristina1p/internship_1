import { Role } from '@models/users'

import { User } from './users'

export interface LoginResponse {
  message: string
  token: string
  userDetails: User
}

export interface RegisterResponse {
  message: string
}

export interface GetAccountResponse {
  userDetails: User
}

export interface ErrorResponse {
  message: string
  code: number
}

export interface ChangePasswordResponse {
  message: string
}

export interface UpdateAccoutDetailsResponse {
  message: string
  userDetails: User
}

export interface UserAnalyticsResponse {
  totalUsers: number
  roles: { role: Role; count: number }[]
}
