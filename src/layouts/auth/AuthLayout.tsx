import { AuthHeader, AuthMainContent } from '@layouts/auth'
import styles from '@layouts/auth/AuthLayout.module.scss'
import { Footer } from '@layouts/dashboard'
import { PropsWithChildren } from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className={styles.authLayout}>
      <AuthHeader />
      <AuthMainContent>{children || <Outlet />}</AuthMainContent>
      <Footer />
    </div>
  )
}
