import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enCommon from './locales/en/common.json'
import esCommon from './locales/es/common.json'
import LanguageDetector from 'i18next-browser-languagedetector'
import dayjs from 'dayjs'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    resources: {
      en: {
        common: enCommon,
      },
      es: {
        common: esCommon,
      },
    },
  })

i18n.on('languageChanged', (lng) => {
  dayjs.locale(lng)
})

export default i18n
