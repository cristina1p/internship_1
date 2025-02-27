import { Breadcrumbs, CreatePostForm } from '@posts/components'

import styles from './CreatePost.module.scss'

const breadcrumbItems = [
  { path: '/dashboard', labelKey: 'dashboard' },
  { labelKey: 'breadcrumb.newPost' },
]

export const CreatePost = () => {
  return (
    <div className={styles.createPostPage}>
      <Breadcrumbs items={breadcrumbItems} />
      <CreatePostForm />
    </div>
  )
}
