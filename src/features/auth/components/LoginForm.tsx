import { login, LoginFormValues } from '@api/auth'
import { LoginRequestBodySchema } from '@api/schemaValidations'
import styles from '@auth/components/AuthForm.module.scss'
import { Input } from '@components/Input'
import { TokenContext } from '@contexts/TokenContext'
import { paths } from '@helper/paths'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const LoginForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setToken } = useContext(TokenContext)
  const [errorMessage, setErrorMessage] = useState('')

  const { mutate } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setToken(data.token)
      navigate(paths.dashboard, { replace: true })
    },
    onError: () => {
      setErrorMessage('Login failed. Please check your credentials.')
    },
  })

  // react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginRequestBodySchema),
  })

  const onSubmit = (loginFormValues: LoginFormValues) => {
    mutate(loginFormValues)
  }

  return (
    <div className={styles.authFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authForm}
        aria-labelledby="login-form-title"
      >
        <h2 id="login-form-title">{t('loginForm.title')}</h2>

        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}

        <Input
          id="email"
          label={t('authForm.emailLabel')}
          type="email"
          placeholder={t('authForm.emailPlaceholder')}
          error={errors.email?.message}
          extraInputProps={() => register('email')}
        />

        <Input
          id="password"
          label={t('authForm.passwordLabel')}
          type="password"
          placeholder={t('authForm.passwordPlaceholder')}
          error={errors.password?.message}
          extraInputProps={() => register('password')}
        />

        <button type="submit" className="buttonPrimary" disabled={isSubmitting}>
          {isSubmitting
            ? t('loginForm.loggingInButton')
            : t('loginForm.loginButton')}{' '}
        </button>
      </form>

      <span>
        {t('loginForm.noAccount')}{' '}
        <Link to={paths.register}>{t('loginForm.registerLink')}</Link>
      </span>
    </div>
  )
}
