import { User } from '@models/users'
import { createContext } from 'react'

type UserDetailsContextType = {
  userDetails: User | undefined
}

export const UserDetailsContext = createContext<UserDetailsContextType>({
  userDetails: undefined,
})
