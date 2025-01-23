import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(HttpBackend) // Loads translations via HTTP
  .use(LanguageDetector) // Detects user's language
  .use(initReactI18next) // Initializes i18next with React bindings
  .init({
    fallbackLng: 'en', // Default language
    debug: true, // Set to false in production
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
  })

export default i18n
