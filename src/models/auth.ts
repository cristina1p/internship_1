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

export interface ChangePasswordRespone {
  message: string
}
