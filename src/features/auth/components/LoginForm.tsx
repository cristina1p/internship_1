import { login, LoginFormValues } from '@api/auth'
import { LoginRequestBodySchema } from '@api/schemaValidations'
import styles from '@auth/components/AuthForm.module.scss'
import { UserDetailsContext } from '@components/contexts'
import { Input } from '@components/Input'
import { saveTokenToLocalStorage } from '@helper/localStorage'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const LoginForm: React.FC = () => {
  const navigate = useNavigate()
  const { setUserDetails } = useContext(UserDetailsContext)
  const [errorMessage, setErrorMessage] = useState('')

  // react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginRequestBodySchema),
  })

  const onSubmit = async (loginFormValues: LoginFormValues) => {
    await login(loginFormValues)
      .then((response) => {
        const { token, userDetails } = response.data
        // Store token to local storage
        saveTokenToLocalStorage(token)
        setUserDetails(userDetails)

        navigate('/dashboard')
      })
      .catch((error) => {
        setErrorMessage('Login failed. Please check your credentials.')
        console.error(error)
      })
  }

  return (
    <div className={styles.authFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authForm}
        aria-labelledby="login-form-title"
      >
        <h2 id="login-form-title">Login</h2>

        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          extraInputProps={() => register('email')}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          extraInputProps={() => register('password')}
        />

        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <span>
        Don't have an account? <Link to="/register">Register</Link>
      </span>
    </div>
  )
}
