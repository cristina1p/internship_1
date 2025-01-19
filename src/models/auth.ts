import { User } from './users'

export interface LoginResponse {
  message: string
  token: string
  userDetails: User
}

export interface RegisterResponse {
  message: string
}
