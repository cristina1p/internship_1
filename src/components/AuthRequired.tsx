import { UserDetailsContext } from '@components/contexts'
import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type AuthRequiredProps = {
  children?: React.ReactNode
}

export function AuthRequired({ children }: AuthRequiredProps) {
  const { userDetails } = useContext(UserDetailsContext)
  const [authChecked, setAuthChecked] = useState(false) // Tracks whether authentication is initialized

  useEffect(() => {
    setAuthChecked(true) // Indicate that authentication has been checked
  }, [])

  // Show nothing while checking authentication
  if (!authChecked) {
    return null
  }

  if (!userDetails) {
    return <Navigate to={'/login'} replace />
  }

  return children ? children : <Outlet />
}
