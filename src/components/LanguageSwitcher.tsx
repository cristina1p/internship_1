import { useTranslation } from 'react-i18next'

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation() // Hook for translations

  // Function to change the language
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng) // Updates the current language
  }

  return (
    <select onChange={(e) => changeLanguage(e.target.value)}>
      <option value={'en'}>English</option>
      <option value={'ro'}>Română</option>
    </select>
  )
}
