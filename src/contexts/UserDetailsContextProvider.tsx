import { QueryKeys } from '@api/queryKeys'
import { getAccount } from '@api/user'
import { Spinner } from '@components/Spinner'
import { TokenContext } from '@contexts/TokenContext'
import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'

export function UserDetailsContextProvider({
  children,
}: React.PropsWithChildren) {
  const { token } = useContext(TokenContext)
  const { data, isLoading } = useQuery({
    queryKey: [QueryKeys.account, token],
    queryFn: getAccount,
    enabled: !!token, // Only run the query if the token exists
  })

  if (isLoading) {
    return <Spinner />
  }

  return (
    <UserDetailsContext.Provider value={{ userDetails: data?.userDetails }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
