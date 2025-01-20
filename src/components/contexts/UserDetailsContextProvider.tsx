import { getAccount } from '@api/user'
import { UserDetailsContext } from '@components/contexts/UserDetailsContext'
import {
  getTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from '@helper/localStorage'
import { ErrorResponse } from '@models/auth'
import { User } from '@models/users'
import axios from 'axios'
import { useEffect, useState } from 'react'

export function UserDetailsContextProvider({
  children,
}: React.PropsWithChildren) {
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined)
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)

  useEffect(() => {
    const token = getTokenFromLocalStorage()

    if (token) {
      async function getAccountAsync() {
        await getAccount()
          .then((response) => {
            const { userDetails } = response.data

            setIsAuthChecked(true)
            setUserDetails(userDetails)
          })
          .catch((error) => {
            if (axios.isAxiosError<ErrorResponse>(error)) {
              const { status, response } = error
              if (
                status === 401 &&
                response?.data?.message === 'Invalid or expired token'
              ) {
                removeTokenFromLocalStorage()
              }
            } else {
              // Handle non-Axios errors
              console.error('Unexpected Error:', error)
            }
            setIsAuthChecked(true)
          })
      }

      getAccountAsync()
    } else {
      setIsAuthChecked(true)
    }
  }, [])

  return (
    <UserDetailsContext.Provider
      value={{ isAuthChecked, userDetails, setUserDetails }}
    >
      {children}
    </UserDetailsContext.Provider>
  )
}
