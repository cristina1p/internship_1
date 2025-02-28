import {
  UpdateUserByIdRequestBodySchema,
  UpdateUserFormValues,
  updateUser,
} from '@api/users'
import { Dropdown } from '@components/Dropdown'
import { Input } from '@components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@models/users'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import styles from '@users/components/EditUserModal.module.scss'
import { t } from 'i18next'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

const genderOptions = [
  { key: 'Male', labelKey: 'gender.Male' },
  { key: 'Female', labelKey: 'gender.Female' },
  { key: 'Prefer Not to Say', labelKey: 'gender.Prefer Not to Say' },
]

interface EditUserModalProps {
  user: User
  onClose: () => void
}

export const EditUserModal = ({ user, onClose }: EditUserModalProps) => {
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      onClose()
    },
  })

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: zodResolver(UpdateUserByIdRequestBodySchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      role: user.role,
    },
  })

  const onSubmit = (userFormValues: UpdateUserFormValues) => {
    mutate({ id: user.id, ...userFormValues })
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2>{t('editModal.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
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
                  menuTrigger={`gender.${field.value}`}
                  className={styles.dropdown}
                  menuClassName={styles.dropdownMenu}
                />
              )}
            />
          </div>

          <button type="submit" className="buttonPrimary" disabled={isPending}>
            {isPending
              ? t('editModal.savingButton')
              : t('editModal.saveButton')}
          </button>
        </form>
      </div>
    </div>
  )
}
