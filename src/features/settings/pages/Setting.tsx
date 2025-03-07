import { SettingsDetailsForm, SettingsPasswordForm } from '@settings/components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Settings.module.scss'

export const Settings = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState<'password' | 'details'>('details')

  return (
    <div className={styles.settingsContainer}>
      <h1>{t('settingsPage.title')}</h1>
      <div className={styles.tabs}>
        <button
          className={activeTab === 'details' ? 'active' : ''}
          onClick={() => setActiveTab('details')}
        >
          {t('settingsPage.changeDetails')}
        </button>
        <button
          className={activeTab === 'password' ? 'active' : ''}
          onClick={() => setActiveTab('password')}
        >
          {t('settingsPage.changePassword')}
        </button>
      </div>
      <div className={styles.settingsFormsContainer}>
        {activeTab === 'details' && (
          <div className={styles.settingsFormContainer}>
            <h5> {t('settingsPage.changeDetails')}</h5>
            <SettingsDetailsForm />
          </div>
        )}

        {activeTab === 'password' && (
          <div className={styles.settingsFormContainer}>
            <h5> {t('settingsPage.changePassword')}</h5>
            <SettingsPasswordForm />
          </div>
        )}
      </div>
    </div>
  )
}
