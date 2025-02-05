import { QueryKeys } from '@api/queryKeys'
import { getAccount } from '@api/user'
import { Spinner } from '@components/Spinner'
import { TokenContext } from '@contexts/TokenContext'
import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { User } from '@models/users'
import { useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useState } from 'react'

export function UserDetailsContextProvider({
  children,
}: React.PropsWithChildren) {
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined)
  const { token } = useContext(TokenContext)
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.account],
    queryFn: getAccount,
    enabled: !!token, // Only run the query if the token exists
  })

  useEffect(() => {
    if (!token) {
      setUserDetails(undefined)
    }
  }, [token])

  useEffect(() => {
    setUserDetails(data?.userDetails)
  }, [data])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <UserDetailsContext.Provider value={{ userDetails }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
