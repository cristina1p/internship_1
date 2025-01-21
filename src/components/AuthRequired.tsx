import { UserDetailsContext } from '@components/contexts'
import { useContext, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthRequired({ children }: PropsWithChildren) {
  const { userDetails } = useContext(UserDetailsContext)

  if (!userDetails) {
    return <Navigate to={'/login'} replace />
  }

  return children || <Outlet />
}
