import { RegisterForm } from '@auth/components/RegisterForm'
import styles from '@auth/pages/Register.module.scss'

export function Register() {
  return (
    <div className={styles.registerPage}>
      <RegisterForm />
    </div>
  )
}
