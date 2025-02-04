import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

// Function to normalize language codes (e.g., 'en-US' → 'en')
const normalizeLanguage = (lang: string) => lang.split('-')[0]

const detectedLanguage = normalizeLanguage(
  localStorage.getItem('i18nextLng') || navigator.language || 'en',
)

i18n
  .use(HttpBackend) // Loads translations via HTTP
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Initializes i18next with React bindings
  .init({
    lng: detectedLanguage,
    fallbackLng: 'en', // Default language
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  })

// Normalize the detected language before setting it
i18n.on('initialized', () => {
  const normalizedLng = normalizeLanguage(i18n.language)
  i18n.changeLanguage(normalizedLng)
})

export default i18n
