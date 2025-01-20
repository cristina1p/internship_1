import { LoginForm } from '@auth/components/LoginForm'
import styles from '@auth/pages/AuthPage.module.scss'

export function Login() {
  return (
    <div className={styles.authPage}>
      <LoginForm />
    </div>
  )
}
