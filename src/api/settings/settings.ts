import { api } from '@api/axios'
import { ChangePasswordFormValues } from '@api/settings'
import { ChangePasswordRespone as ChangePasswordResponse } from '@models/auth'

export const changePassword = async (
  changePasswordFormValues: ChangePasswordFormValues,
): Promise<ChangePasswordResponse> => {
  const response = await api.post<ChangePasswordResponse>(
    'account/settings/changePassword',
    changePasswordFormValues,
  )
  return response.data
}
