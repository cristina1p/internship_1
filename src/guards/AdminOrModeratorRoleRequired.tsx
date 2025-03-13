import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { paths } from '@helper/paths'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const AdminOrModeratorRoleRequired = () => {
  const { userDetails } = useContext(UserDetailsContext)

  if (userDetails?.role === 'User') {
    return <Navigate to={paths.posts} />
  }

  return <Outlet />
}
