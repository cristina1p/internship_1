import { AddUserFormValues, AddUserRequestBodySchema } from '@api/users'
import { addUser } from '@api/users/addUser'
import { Dropdown } from '@components/Dropdown'
import { Input } from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { genderOptions, roleOptions } from '@users/helper'
import axios from 'axios'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import styles from './AddUserForm.module.scss'

export const AddUserForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/users')
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || 'Register failed')
      } else {
        // Handle non-Axios errors
        setErrorMessage('An unexpected error occurred')
      }
    },
  })
  // Initialize react hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddUserFormValues>({
    resolver: zodResolver(AddUserRequestBodySchema),
  })

  const onSubmit = async (addUserFormValues: AddUserFormValues) => {
    setErrorMessage('')
    mutate(addUserFormValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addUserForm}>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
      <Input
        id="firstName"
        label={t('editModal.firstNameInputLabel')}
        type="text"
        error={errors.firstName?.message}
        extraInputProps={() => register('firstName')}
      />

      <Input
        id="lastName"
        label={t('editModal.lastNameInputLabel')}
        type="text"
        error={errors.lastName?.message}
        extraInputProps={() => register('lastName')}
      />

      <Input
        id="email"
        label={t('authForm.emailLabel')}
        type="email"
        error={errors.email?.message}
        extraInputProps={() => register('email')}
      />

      <Input
        id="password"
        label={t('authForm.passwordLabel')}
        type="password"
        error={errors.password?.message}
        extraInputProps={() => register('password')}
      />

      <Input
        id="confirmPassword"
        label={t('addUserForm.confirmPasswordLabel')}
        type="password"
        error={errors.confirmPassword?.message}
        extraInputProps={() => register('confirmPassword')}
      />

      <div className={styles.dropdownContainer}>
        <label htmlFor="gender">{t('editModal.genderInputLabel')} </label>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Dropdown
              id="gender"
              options={genderOptions}
              onOptionClick={field.onChange}
              menuTrigger={
                field.value
                  ? `gender.${field.value}`
                  : 'gender.Prefer Not to Say'
              }
              className={styles.dropdown}
              menuClassName={styles.dropdownMenu}
            />
          )}
        />
      </div>

      <div className={styles.dropdownRole}>
        <label htmlFor="role">{t('addUserForm.roleLabel')}</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Dropdown
              id="role"
              options={roleOptions}
              onOptionClick={field.onChange}
              menuTrigger={field.value ? `role.${field.value}` : 'role.User'}
              className={styles.dropdown}
              menuClassName={styles.dropdownMenu}
            />
          )}
        />
      </div>

      <button type="submit" className="buttonPrimary" disabled={isPending}>
        {isPending ? t('editModal.savingButton') : t('addUserForm.button')}
      </button>
    </form>
  )
}
