import { api } from '@api/axios'
import {
  LoginRequestBodySchema,
  RegisterRequestBodySchema,
} from '@api/schemaValidations'
import { LoginResponse, RegisterResponse } from '@models/auth'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof LoginRequestBodySchema>
export type RegisterFormValues = z.infer<typeof RegisterRequestBodySchema>

export const login = async (
  loginFormValues: LoginFormValues,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('login', loginFormValues)
  return response.data
}

export const register = async (
  registerFormValues: RegisterFormValues,
): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>(
    'register',
    registerFormValues,
  )
  return response.data
}
