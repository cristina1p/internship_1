import { updatePost } from '@api/updatePost'
import { Post } from '@models/posts'
import styles from '@posts/components/EditPostModal.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface EditPostModalProps {
  post: Post
  onClose: () => void
}

export const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const { t } = useTranslation()
  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description)
  const [imageUrl, setImageUrl] = useState(post.image)
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSave = () => {
    mutate({ id: post.id, title, description, image: imageUrl })
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

  const isSaveDisabled =
    !title ||
    !description ||
    (title === post.title &&
      description === post.description &&
      imageUrl === post.image)

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2>{t('editModal.title')}</h2>

        <label>
          {t('editModal.titleInputLabel')}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          {t('editModal.descriptionInputLabel')}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        <label>
          {t('editModal.imageUrlInputLabel')}
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>

        <button
          className="buttonPrimary"
          onClick={handleSave}
          disabled={isSaveDisabled || isPending}
        >
          {isPending ? t('editModal.savingButton') : t('editModal.saveButton')}
        </button>
        {isError && (
          <p className={styles.error}>{t('editPostModal.errorMessage')}</p>
        )}
      </div>
    </div>
  )
}
