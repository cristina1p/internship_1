import { UserDetailsContext } from '@components/contexts/UserDetailsContext'
import { getUserFromLocalStorage } from '@helper/localStorage'
import { User } from '@models/users'
import { useEffect, useState } from 'react'

export function UserDetailsContextProvider({
  children,
}: React.PropsWithChildren) {
  const [userDetails, setUserDetails] = useState<User | undefined>(undefined)

  useEffect(() => {
    const userDetails = getUserFromLocalStorage()
    setUserDetails(userDetails)
  }, [])

  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserDetailsContext.Provider>
  )
}
