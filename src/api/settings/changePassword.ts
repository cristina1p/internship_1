import { api } from '@api/axios'
import { ChangePasswordFormValues } from '@api/settings/ChangePasswordRequestBodySchema'
import { ChangePasswordResponse } from '@models/auth'

export const changePassword = async (
  changePasswordFormValues: ChangePasswordFormValues,
): Promise<ChangePasswordResponse> => {
  const response = await api.put<ChangePasswordResponse>(
    'account/settings/changePassword',
    changePasswordFormValues,
  )
  return response.data
}
