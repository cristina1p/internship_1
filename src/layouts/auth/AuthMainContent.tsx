import styles from '@layouts/auth/AuthMainContent.module.scss'
import { PropsWithChildren } from 'react'

export const AuthMainContent = ({ children }: PropsWithChildren) => {
  return <main className={styles.authMainContent}>{children}</main>
}
