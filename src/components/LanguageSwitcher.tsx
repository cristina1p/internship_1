import { useTranslation } from 'react-i18next'

import { Dropdown } from './Dropdown'

const languageOptions = [
  { key: 'en', labelKey: 'language.english' },
  { key: 'ro', labelKey: 'language.romanian' },
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageChange = (key: string) => {
    i18n.changeLanguage(key)
  }

  const selectedLanguage =
    languageOptions.find((option) => option.key === i18n.language) ||
    languageOptions[0]

  return (
    <Dropdown
      options={languageOptions}
      onOptionClick={handleLanguageChange}
      menuTrigger={selectedLanguage?.labelKey}
    />
  )
}
