import { createContext } from 'react'

type TokenContextType = {
  token: string
  setToken: (token: string) => void
}

export const TokenContext = createContext<TokenContextType>({
  token: '',
  setToken: () => {},
})
