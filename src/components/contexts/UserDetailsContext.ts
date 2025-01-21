import { User } from '@models/users'
import { createContext } from 'react'

type UserDetailsContextType = {
  userDetails: User | undefined
  setUserDetails: (userDetails: User) => void
}

export const UserDetailsContext = createContext<UserDetailsContextType>({
  userDetails: undefined,
  setUserDetails: () => {},
})
