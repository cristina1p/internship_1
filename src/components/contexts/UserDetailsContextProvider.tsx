import { getAccount } from '@api/user'
import { UserDetailsContext } from '@components/contexts/UserDetailsContext'
import { Spinner } from '@components/Spinner'
import { getTokenFromLocalStorage } from '@helper/localStorage'
import { User } from '@models/users'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

export function UserDetailsContextProvider({
  children,
}: React.PropsWithChildren) {
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined)
  // Temporary sync state to avoid flicker
  const [isSyncing, setIsSyncing] = useState<boolean>(true)
  const token = getTokenFromLocalStorage()
  const { data, isLoading } = useQuery({
    queryKey: ['accountDetails'],
    queryFn: getAccount,
    enabled: !!token, // Only run the query if the token exists
  })

  useEffect(() => {
    if (data?.userDetails) {
      setUserDetails(data.userDetails)
      setIsSyncing(false) // Synchronization complete
    } else if (!isLoading) {
      // If loading is done
      setIsSyncing(false)
    }
  }, [data, isLoading])

  if (isLoading || isSyncing) {
    return <Spinner /> // Show spinner while loading or syncing
  }

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
