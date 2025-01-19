import { RegisterFormValues, register as registerApi } from '@api/auth'
import { RegisterRequestBodySchema } from '@api/schemaValidations'
import styles from '@auth/components/AuthForm.module.scss'
import { Checkbox } from '@components/Checkbox'
import { Input } from '@components/Input'
import { Select } from '@components/Select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Gender } from '@models/users'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

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

    await registerApi(registerFormValues)
      .then(() => navigate('/login'))
      .catch((error) => {
        setErrorMessage(error.response?.data?.message || 'Register failed')
      })
  }

  return (
    <div className={styles.authFormContainer}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.authForm}
        aria-labelledby="register-form-title"
      >
        <h2 id="register-form-title">Register</h2>

        {errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}

        <Input
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Enter your first name"
          error={errors.firstName?.message}
          extraInputProps={() => register('firstName')}
        />

        <Input
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Enter your last name"
          aria-label="Last Name"
          aria-required={true}
          error={errors.lastName?.message}
          extraInputProps={() => register('lastName')}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          extraInputProps={() => register('email')}
        />

        <Select
          id="gender"
          label="Gender"
          error={errors.gender}
          options={GenderSelectOptions}
          extraSelectProps={() => register('gender')}
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          error={errors.password?.message}
          extraInputProps={() => register('password')}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          error={errors.confirmPassword?.message}
          extraInputProps={() => register('confirmPassword')}
        />

        <Checkbox
          id="termsAndConditions"
          label="I agree to the terms and conditions"
          error={errors.termsAndConditions}
          extraInputProps={() => register('termsAndConditions')}
        />

        <button className="button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Registering in...' : 'Register'}
        </button>
      </form>

      <span>
        Already register? <Link to="/login">Login</Link>
      </span>
    </div>
  )
}
