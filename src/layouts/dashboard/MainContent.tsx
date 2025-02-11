import styles from '@layouts/dashboard/MainContent.module.scss'
import { PropsWithChildren } from 'react'

export const MainContent = ({ children }: PropsWithChildren) => {
  return <main className={styles.mainContent}>{children}</main>
}
