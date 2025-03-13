import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { PostsAnalytics, UsersAnalytics } from '@dashboard/components'
import { useContext } from 'react'

export const Dashboard = () => {
  const { userDetails } = useContext(UserDetailsContext)

  return (
    <div>
      <h1>Analytics</h1>
      {userDetails?.role === 'Admin' && <UsersAnalytics />}
      <PostsAnalytics />
    </div>
  )
}
