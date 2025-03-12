import { api } from '@api/axios'
import { UpdateAccountDetailsFormValues } from '@api/settings/UpdateAccountDetailsRequestBodySchema'
import { filterEmptyParams } from '@helper/filterEmptyParams'
import { User } from '@models/users'

export const updateAccountDetails = async (
  updateAccountDetailsFormValues: UpdateAccountDetailsFormValues,
): Promise<User> => {
  const filteredBody = filterEmptyParams(updateAccountDetailsFormValues)

  const response = await api.put('account/settings/changeDetails', filteredBody)
  return response.data
}
