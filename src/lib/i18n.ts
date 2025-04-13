import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// 언어별 리소스 가져오기
import koTranslations from '@/locales/ko.json'
import enTranslations from '@/locales/en.json'
import laTranslations from '@/locales/la.json'

// i18n 설정
i18n
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: koTranslations },
      en: { translation: enTranslations },
      la: { translation: laTranslations }
    },
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko', // 번역이 없는 경우 폴백 언어
    interpolation: {
      escapeValue: false // React는 이미 XSS 방지를 해주므로 비활성화
    }
  })

export default i18n