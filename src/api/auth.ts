import { api } from '@api/axios'
import {
  LoginRequestBodySchema,
  RegisterRequestBodySchema,
} from '@api/schemaValidations'
import { LoginResponse, RegisterResponse } from '@models/auth'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof LoginRequestBodySchema>
export type RegisterFormValues = z.infer<typeof RegisterRequestBodySchema>

export const login = (loginFormValues: LoginFormValues) =>
  api.post<LoginResponse>('login', loginFormValues)

export const register = (registerFormValues: RegisterFormValues) =>
  api.post<RegisterResponse>('register', registerFormValues)
