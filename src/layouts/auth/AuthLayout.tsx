import { AuthHeader, AuthMainContent } from '@layouts/auth'
import styles from '@layouts/auth/AuthLayout.module.scss'
import { Footer } from '@layouts/dashboard'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div className={styles.authLayout}>
      <AuthHeader />
      <AuthMainContent>
        <Outlet />
      </AuthMainContent>
      <Footer />
    </div>
  )
}
