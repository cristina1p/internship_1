import { paths } from '@helper/paths'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Outlet } from 'react-router-dom'

import styles from './Settings.module.scss'

export const Settings = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState<'password' | 'details'>('details')

  return (
    <div className={styles.settingsContainer}>
      <h1>{t('settingsPage.title')}</h1>

      <div className={styles.tabs}>
        <Link
          to={paths.changeDetails}
          className={activeTab === 'details' ? 'active' : ''}
          onClick={() => setActiveTab('details')}
        >
          {t('settingsPage.changeDetails')}
        </Link>

        <Link
          to={paths.changePassword}
          className={activeTab === 'password' ? 'active' : ''}
          onClick={() => setActiveTab('password')}
        >
          {t('settingsPage.changePassword')}
        </Link>
      </div>

      <div className={styles.settingsSubPageContainer}>
        <Outlet />
      </div>
    </div>
  )
}
