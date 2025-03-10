import { ChangeDetailsForm } from '@settings/components'
import { t } from 'i18next'

import styles from './Settings.module.scss'

export const SettingsChangeDetails = () => {
  return (
    <div className={styles.settingsFormContainer}>
      <h5> {t('settingsPage.changeDetails')}</h5>
      <ChangeDetailsForm />
    </div>
  )
}
