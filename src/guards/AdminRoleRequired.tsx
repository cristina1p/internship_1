import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { paths } from '@helper/paths'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const AdminRoleRequired = () => {
  const { userDetails } = useContext(UserDetailsContext)
  if (userDetails?.role !== 'Admin') {
    return <Navigate to={paths.dashboard} />
  }
  return <Outlet />
}
