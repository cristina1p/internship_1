import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { paths } from '@helper/paths'
import { useContext, PropsWithChildren } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthRequired({ children }: PropsWithChildren) {
  const { userDetails } = useContext(UserDetailsContext)

  if (!userDetails) {
    return <Navigate to={paths.login} replace />
  }

  return children || <Outlet />
}
