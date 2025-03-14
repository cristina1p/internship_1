import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { PostsAnalytics, UsersAnalytics } from '@dashboard/components'
import { useContext } from 'react'

import styles from './dashboard.module.scss'

export const Dashboard = () => {
  const { userDetails } = useContext(UserDetailsContext)

  return (
    <div className={styles.dashboard}>
      <h1>Analytics</h1>
      <div
        className={
          userDetails?.role === 'Admin'
            ? styles['analyticsContainer']
            : styles['singleAnalytics']
        }
      >
        {userDetails?.role === 'Admin' && <UsersAnalytics />}
        <PostsAnalytics />
      </div>
    </div>
  )
}
