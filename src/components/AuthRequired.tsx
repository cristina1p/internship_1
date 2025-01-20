import { UserDetailsContext } from '@components/contexts'
import { useContext, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthRequired({ children }: PropsWithChildren) {
  const { isAuthChecked, userDetails } = useContext(UserDetailsContext)

  // Show nothing while checking authentication
  if (!isAuthChecked) {
    return null
  }

  if (!userDetails) {
    return <Navigate to={'/login'} replace />
  }

  return children || <Outlet />
}
