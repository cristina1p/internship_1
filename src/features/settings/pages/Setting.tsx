import { paths } from '@helper/paths'
import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router-dom'

import styles from './Settings.module.scss'

export const Settings = () => {
  const { t } = useTranslation()
  const location = useLocation()

  return (
    <div className={styles.settingsContainer}>
      <h1>{t('settingsPage.title')}</h1>

      <div className={styles.tabs}>
        <Link
          to={paths.changeDetails}
          className={`${location.pathname === paths.changeDetails ? styles.active : ''}`}
        >
          {t('settingsPage.changeDetails')}
        </Link>

        <Link
          to={paths.changePassword}
          className={`${location.pathname === paths.changePassword ? styles.active : ''}`}
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
