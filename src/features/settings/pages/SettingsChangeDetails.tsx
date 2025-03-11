import { ChangeDetailsForm } from '@settings/components'
import { useTranslation } from 'react-i18next'

import styles from './Settings.module.scss'

export const SettingsChangeDetails = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.settingsFormContainer}>
      <h5> {t('settingsPage.changeDetails')}</h5>
      <ChangeDetailsForm />
    </div>
  )
}
