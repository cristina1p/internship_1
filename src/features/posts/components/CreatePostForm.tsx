import { api } from '@api/axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import styles from './CreatePostForm.module.scss'

export const CreatePostForm = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // prevetnt the page to refresh

    // Call API to create a new post
    try {
      const response = await api.post('/posts', {
        title,
        description,
        image,
      })
      console.log('Post created successfully:', response.data)

      navigate('/posts')
    } catch (error) {
      console.log('Error creating post:', error)
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.createPostForm}>
      <label>
        {t('createPostForm.title')}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        <p>{t('createPostForm.description')}</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>

      <label>
        {t('createPostForm.imageUrl')}
        <input
          type="url"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </label>

      <button type="submit" className="buttonPrimary">
        {t('createPostForm.button')}
      </button>
    </form>
  )
}
