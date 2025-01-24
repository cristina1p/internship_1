import { RegisterFormValues, register as registerApi } from '@api/auth'
import { RegisterRequestBodySchema } from '@api/schemaValidations'
import styles from '@auth/components/AuthForm.module.scss'
import { Checkbox } from '@components/Checkbox'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { paths } from '@helper/paths'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gender } from '@models/users'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

type GenderSelectOptionsType = {
  value: Gender | ''
  label: string
}

const GenderSelectOptions: GenderSelectOptionsType[] = [
  { value: '', label: 'Select your gender' },
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Prefer Not to Say', label: 'Prefer Not to Say' },
]

export const RegisterForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { mutate } = useMutation({
    mutationFn: registerApi,
    onSuccess: () => navigate(paths.login),
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Register failed')
      } else {
        // Handle non-Axios errors
        setErrorMessage('An unexpected error occurred')
      }
    },
  })

  // react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterRequestBodySchema),
  })

  const onSubmit = async (registerFormValues: RegisterFormValues) => {
    setErrorMessage('')
    mutate(registerFormValues)
  }

  return (
    <div className={styles.authFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authForm}
        aria-labelledby="register-form-title"
      >
        <h2 id="register-form-title">{t('registerForm.title')}</h2>

        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}

        <Input
          id="firstName"
          label={t('registerForm.firstNameLabel')}
          type="text"
          placeholder={t('registerForm.firstNamePlaceholder')}
          error={errors.firstName?.message}
          extraInputProps={() => register('firstName')}
        />

        <Input
          id="lastName"
          label={t('registerForm.lastNameLabel')}
          type="text"
          placeholder={t('registerForm.lastNamePlaceholder')}
          aria-label="Last Name"
          aria-required={true}
          error={errors.lastName?.message}
          extraInputProps={() => register('lastName')}
        />

        <Input
          id="email"
          label={t('authForm.emailLabel')}
          type="email"
          placeholder={t('authForm.emailPlaceholder')}
          error={errors.email?.message}
          extraInputProps={() => register('email')}
        />

        <Select
          id="gender"
          label={t('registerForm.genderLabel')}
          error={errors.gender}
          options={GenderSelectOptions}
          extraSelectProps={() => register('gender')}
        />

        <Input
          id="password"
          label={t('authForm.passwordLabel')}
          type="password"
          placeholder={t('authForm.passwordPlaceholder')}
          error={errors.password?.message}
          extraInputProps={() => register('password')}
        />

        <Input
          id="confirmPassword"
          label={t('registerForm.confirmPasswordLabel')}
          placeholder={t('registerForm.confirmPasswordPlaceholder')}
          type="password"
          error={errors.confirmPassword?.message}
          extraInputProps={() => register('confirmPassword')}
        />

        <Checkbox
          id="termsAndConditions"
          label={t('registerForm.termsAndConditionsLabel')}
          error={errors.termsAndConditions}
          extraInputProps={() => register('termsAndConditions')}
        />

        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? t('registerForm.registeringButton')
            : t('registerForm.registerButton')}
        </button>
      </form>

      <span>
        {t('registerForm.alreadyRegistered')}{' '}
        <Link to={paths.login}>{t('registerForm.loginLink')}</Link>
      </span>
    </div>
  )
}
