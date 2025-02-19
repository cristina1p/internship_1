import { CreatePostForm } from '@posts/components'

import styles from './CreatePost.module.scss'

export const CreatePost = () => {
  return (
    <div className={styles.createPostPage}>
      <CreatePostForm />
    </div>
  )
}
