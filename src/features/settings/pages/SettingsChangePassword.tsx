import { ChangePasswordForm } from '@settings/components'
import { useTranslation } from 'react-i18next'

import styles from './Settings.module.scss'

export const SettingsChangePassword = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.settingsFormContainer}>
      <h5> {t('settingsPage.changePassword')}</h5>
      <ChangePasswordForm />
    </div>
  )
}
