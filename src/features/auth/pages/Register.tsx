import { RegisterForm } from '@auth/components/RegisterForm'
import styles from '@auth/pages/AuthPage.module.scss'

export function Register() {
  return (
    <div className={styles.authPage}>
      <RegisterForm />
    </div>
  )
}
