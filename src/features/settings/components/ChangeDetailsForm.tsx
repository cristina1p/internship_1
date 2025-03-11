import {
  UpdateAccountDetailsFormValues,
  UpdateAccountDetailsRequestBodySchema,
} from '@api/settings'
import { updateAccountDetails } from '@api/settings/updateAccountDetails'
import { Dropdown } from '@components/Dropdown'
import { Input } from '@components/Input'
import { UserDetailsContext } from '@contexts/UserDetailsContext'
import { paths } from '@helper/paths'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { genderOptions } from '@users/helper'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import styles from './ChangeDetailsForm.module.scss'

export const ChangeDetailsForm = () => {
  const { t } = useTranslation()
  const { userDetails } = useContext(UserDetailsContext)
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { mutate } = useMutation({
    mutationFn: updateAccountDetails,
    onSuccess: () => {
      toast.success(t('changeDetails.form.updateSuccess'))

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

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateAccountDetailsFormValues>({
    resolver: zodResolver(UpdateAccountDetailsRequestBodySchema),
    defaultValues: {
      firstName: userDetails!.firstName,
      lastName: userDetails!.lastName,
    },
  })

  const onSubmit = (
    acountDetailsFormValues: UpdateAccountDetailsFormValues,
  ) => {
    mutate(acountDetailsFormValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.settingsForm}>
      {errorMessage && (
        <span className={styles.errorMessage}>{errorMessage}</span>
      )}
      <div className={styles.fieldsContainer}>
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
          {t('changePassword.form.saveButton')}
        </button>
      </div>
    </form>
  )
}
