import { TokenContext } from '@contexts/TokenContext'
import {
  getTokenFromLocalStorage,
  saveTokenToLocalStorage,
} from '@helper/localStorage'
import { useEffect, useState } from 'react'

export function TokenContextProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useState<string>(getTokenFromLocalStorage())

  useEffect(() => {
    saveTokenToLocalStorage(token)
  }, [token])

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  )
}
