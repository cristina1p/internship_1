import { LanguageSwitcher } from '@components/LanguageSwitcher'
import styles from '@layouts/auth/AuthHeader.module.scss'

export const AuthHeader = () => {
  return (
    <header className={styles.authHeader}>
      <div className={styles.logo}>Logo</div>
      <LanguageSwitcher />
    </header>
  )
}
