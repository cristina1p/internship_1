import { CreatePostFormValues, CreatePostRequestBodySchema } from '@api/posts'
import { createPost } from '@api/posts/createPost'
import { Input } from '@components/Input'
import { Textarea } from '@components/Textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import styles from './CreatePostForm.module.scss'

export const CreatePostForm = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      navigate('/posts')
    },
  })

  // Initialize react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(CreatePostRequestBodySchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  })

  const onSubmit = (createPostFormValues: CreatePostFormValues) => {
    mutate(createPostFormValues)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.createPostForm}>
      <Input
        id="title"
        label={t('createPostForm.title')}
        type="text"
        error={errors.title?.message}
        extraInputProps={() => register('title')}
      />

      <Textarea
        id="description"
        label={t('createPostForm.description')}
        error={errors.description?.message}
        extraTextareaProps={() => register('description')}
      />

      <Input
        id="image"
        label={t('createPostForm.imageUrl')}
        type="url"
        error={errors.image?.message}
        extraInputProps={() => register('image')}
      />

      <button type="submit" className="buttonPrimary" disabled={isPending}>
        {isPending
          ? t('createPostForm.savingButton')
          : t('createPostForm.button')}
      </button>
    </form>
  )
}
