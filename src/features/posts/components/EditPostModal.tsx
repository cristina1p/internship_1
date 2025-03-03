import { UpdatePostFormValues, UpdatePostRequestBodySchema } from '@api/posts'
import { updatePost } from '@api/posts'
import { Dropdown } from '@components/Dropdown'
import { Input } from '@components/Input'
import { Textarea } from '@components/Textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Post, Status } from '@models/posts'
import styles from '@posts/components/EditPostModal.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

const statusOptions = [
  { key: 'Published', labelKey: 'status.Published' },
  { key: 'Draft', labelKey: 'status.Draft' },
]

interface EditPostModalProps {
  post: Post
  onClose: () => void
}

export const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const { t } = useTranslation()
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UpdatePostFormValues>({
    resolver: zodResolver(UpdatePostRequestBodySchema),
    defaultValues: {
      title: post.title,
      description: post.description,
      image: post.image,
      status: post.status as Status | undefined,
    },
  })

  const onSubmit = (postFormValues: UpdatePostFormValues) => {
    mutate({ id: post.id, ...postFormValues })
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

        <h2>{t('editModalPost.title')}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="title"
            label={t('editModal.titleInputLabel')}
            type="text"
            error={errors.title?.message}
            extraInputProps={() => register('title')}
          />

          <div className={styles.dropdownContainer}>
            <label htmlFor="status">{t('editModal.statusInputLabel')} </label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Dropdown
                  id="status"
                  options={statusOptions}
                  onOptionClick={field.onChange}
                  menuTrigger={`status.${field.value}`}
                  className={styles.dropdown}
                  menuClassName={styles.dropdownMenu}
                />
              )}
            />
          </div>

          <Textarea
            id="description"
            label={t('editModal.descriptionInputLabel')}
            {...register('description')}
            error={errors.description?.message}
            extraTextareaProps={() => register('description')}
          />

          <Input
            id="image"
            label={t('editModal.imageUrlInputLabel')}
            type="url"
            error={errors.image?.message}
            extraInputProps={() => register('image')}
          />

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
