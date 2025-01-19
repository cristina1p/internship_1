import { UserDetailsContext } from '@components/contexts'
import { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type LoggedOutProps = {
  children?: React.ReactNode
}

export function LoggedOutRequired({ children }: LoggedOutProps) {
  const { userDetails } = useContext(UserDetailsContext)
  const [authChecked, setAuthChecked] = useState(false) // Tracks whether authentication is initialized

  useEffect(() => {
    setAuthChecked(true) // Indicate that authentication has been checked
  }, [])

  // Show nothing while checking authentication
  if (!authChecked) {
    return null
  }

  if (userDetails) {
    if (userDetails.role === 'User') {
      return <Navigate to={'/posts'} replace />
    } else {
      return <Navigate to={'/dashboard'} replace />
    }
  }

  return children ? children : <Outlet />
}
