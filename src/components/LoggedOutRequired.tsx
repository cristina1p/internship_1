import { UserDetailsContext } from '@components/contexts'
import { useContext, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function LoggedOutRequired({ children }: PropsWithChildren) {
  const { isAuthChecked, userDetails } = useContext(UserDetailsContext)

  // Show nothing while checking authentication
  if (!isAuthChecked) {
    return null
  }

  if (userDetails) {
    return <Navigate to={'/dashboard'} replace />
  }

  return children || <Outlet />
}
