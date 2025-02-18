import { Post } from '@models/posts'
import styles from '@posts/components/EditPostModal.module.scss'
import { useEffect } from 'react'

interface EditPostModalProps {
  post: Post | null
  onClose: () => void
}

export const EditPostModal = ({ onClose }: EditPostModalProps) => {
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
        <h2>Edit Post</h2>
        <p>Title post</p>
        <button className="buttonOutline" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
