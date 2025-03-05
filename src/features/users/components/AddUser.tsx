import { Breadcrumbs } from '@posts/components'

import styles from './AddUser.module.scss'
import { AddUserForm } from './AddUserForm'

const breadcrumbItems = [
  { path: '/dashboard', labelKey: 'dashboard' },
  { labelKey: 'breadcrumb.newUser' },
]

export const AddUser = () => {
  return (
    <div className={styles.addUserPage}>
      <Breadcrumbs items={breadcrumbItems} />
      <AddUserForm />
    </div>
  )
}
