import { getAccount } from '@api/user'
import { UserDetailsContext } from '@components/contexts/UserDetailsContext'
import { getTokenFromLocalStorage } from '@helper/localStorage'
import { User } from '@models/users'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function UserDetailsContextProvider({
  children,
}: React.PropsWithChildren) {
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined)
  const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)
  const token = getTokenFromLocalStorage()
  const { data, isError, isSuccess } = useQuery({
    queryKey: ['accountDetails'],
    queryFn: getAccount,
    enabled: !!token, // Only run the query if the token exists
  })
  useEffect(() => {
    if (data) {
      setUserDetails(data.userDetails)
    }
  }, [data])

  useEffect(() => {
    if (!token || isError || isSuccess) {
      setIsAuthChecked(true)
    }
  }, [token, isError, isSuccess])

  return (
    <UserDetailsContext.Provider
      value={{ isAuthChecked, userDetails, setUserDetails }}
    >
      {children}
    </UserDetailsContext.Provider>
  )
}
