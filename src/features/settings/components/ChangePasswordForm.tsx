import {
  ChangePasswordFormValues,
  ChangePasswordRequestBodySchema,
} from '@api/settings'
import { changePassword } from '@api/settings/changePassword'
import { Input } from '@components/Input'
import { paths } from '@helper/paths'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './ChangePasswordForm.module.scss'

export const ChangePasswordForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  const { mutate } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success(t('changePassword.form.changePasswordSuccess'))
      navigate(paths.dashboard)
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message || 'Change password failed',
        )
      } else {
        setErrorMessage('An unexpected error occurred')
      }
    },
  })

  // react-hook-form with zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordRequestBodySchema),
  })

  const onSubmit = async (
    changePasswordFormValues: ChangePasswordFormValues,
  ) => {
    setErrorMessage('')
    mutate(changePasswordFormValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.settingsForm}>
      <div className={styles.fieldsContainer}>
        <Input
          id="oldPassword"
          label={t('changePassword.form.oldPasswordLabel')}
          type="password"
          placeholder={t('changePassword.form.oldPasswordPlaceholder')}
          error={errors.oldPassword?.message}
          extraInputProps={() => register('oldPassword')}
        />

        <Input
          id="newPassword"
          label={t('changePassword.form.newPasswordLabel')}
          type="password"
          placeholder={t('changePassword.form.newPasswordPlaceholder')}
          error={errors.newPassword?.message}
          extraInputProps={() => register('newPassword')}
        />

        <Input
          id="confirmPassword"
          label={t('changePassword.form.confirmPasswordLabel')}
          type="password"
          placeholder={t('changePassword.form.confirmPasswordPlaceholder')}
          error={errors.confirmPassword?.message}
          extraInputProps={() => register('confirmPassword')}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <button
          className="buttonSecondary"
          type="button"
          onClick={() => navigate(paths.dashboard)}
        >
          {t('changePassword.form.cancelButton')}
        </button>
        <button className="buttonPrimary" type="submit">
          {t('changePassword.form.savePasswordButton')}
        </button>
      </div>

      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
    </form>
  )
}
