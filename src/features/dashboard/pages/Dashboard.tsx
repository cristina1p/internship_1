import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { PostsAnalytics, UsersAnalytics } from '@dashboard/components'
import { useContext } from 'react'

import styles from './dashboard.module.scss'

export const Dashboard = () => {
  const { userDetails } = useContext(UserDetailsContext)

  return (
    <div className={styles.dashboard}>
      <h1>Analytics</h1>
      {userDetails?.role === 'Admin' ? (
        <div className={styles.analyticsContainer}>
          <UsersAnalytics />
          <PostsAnalytics />
        </div>
      ) : (
        <div className={styles.singleAnalytics}>
          <PostsAnalytics />
        </div>
      )}
    </div>
  )
}
