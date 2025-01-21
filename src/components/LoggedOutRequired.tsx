import { UserDetailsContext } from '@components/contexts'
import { useContext, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function LoggedOutRequired({ children }: PropsWithChildren) {
  const { userDetails } = useContext(UserDetailsContext)

  if (userDetails) {
    return <Navigate to={'/dashboard'} replace />
  }

  return children || <Outlet />
}
