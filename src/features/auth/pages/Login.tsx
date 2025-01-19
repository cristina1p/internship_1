import { LoginForm } from '@auth/components/LoginForm'
import styles from '@auth/pages/Login.module.scss'

export function Login() {
  return (
    <div className={styles.loginPage}>
      <LoginForm />
    </div>
  )
}
