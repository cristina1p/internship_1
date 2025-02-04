import { useTranslation } from 'react-i18next'

import { Dropdown } from './Dropdown'

const languageOptions = [
  { key: 'en', label: 'English' },
  { key: 'ro', label: 'Română' },
]

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const handleLanguageClick = (key: string) => {
    i18n.changeLanguage(key)
  }

  const selectedLanguage =
    languageOptions.find((option) => option.key === i18n.language) ||
    languageOptions[0]

  return (
    <Dropdown
      options={languageOptions}
      onOptionClick={(key) => handleLanguageClick(key)}
      menuTrigger={selectedLanguage?.label}
    />
  )
}
