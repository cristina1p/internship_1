import { updatePost } from '@api/updatePost'
import { Dropdown } from '@components/Dropdown'
import { Post, Status } from '@models/posts'
import styles from '@posts/components/EditPostModal.module.scss'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const getStatusOptions = [
  { key: 'Published', labelKey: 'status.Published' },
  { key: 'Draft', labelKey: 'status.Draft' },
]

interface EditPostModalProps {
  post: Post
  onClose: () => void
}

export const EditPostModal = ({ post, onClose }: EditPostModalProps) => {
  const { t } = useTranslation()
  const [title, setTitle] = useState(post.title)
  const [description, setDescription] = useState(post.description)
  const [imageUrl, setImageUrl] = useState(post.image)
  const [statusKey, setStatusKey] = useState(post.status)
  const queryClient = useQueryClient()

  const { mutate, isPending, isError } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      onClose()
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
  })

  const handleSave = () => {
    mutate({
      id: post.id,
      title,
      description,
      image: imageUrl,
      status: statusKey,
    })
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

  const isSaveDisabled = !title || !description

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

        {t('editModal.statusInputLabel')}
        <Dropdown
          options={getStatusOptions}
          onOptionClick={(key) => setStatusKey(key as Status)}
          menuTrigger={statusKey ? `status.${statusKey}` : 'status.all'}
          className={styles.dropdown}
          menuClassName={styles.dropdownMenu}
        />

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
