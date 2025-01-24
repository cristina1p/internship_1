import styles from '@components/LanguageSwitcher.module.scss'
import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation() // Hook for translations

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className={styles.languageSwitcher}>
      <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value={'en'}>English</option>
        <option value={'ro'}>Română</option>
      </select>
    </div>
  )
}
