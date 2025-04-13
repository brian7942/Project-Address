import { useState, useCallback } from 'react'
import i18n from '@/lib/i18n'

export const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  const changeLanguage = useCallback((lang: string) => {
    i18n.changeLanguage(lang)
    setCurrentLanguage(lang)
    // 필요한 경우 언어 설정을 로컬 스토리지에 저장
    localStorage.setItem('appLanguage', lang)
  }, [])

  const resetToDefaultLanguage = useCallback(() => {
    const defaultLang = 'ko'
    i18n.changeLanguage(defaultLang)
    setCurrentLanguage(defaultLang)
    localStorage.setItem('appLanguage', defaultLang)
  }, [])

  return {
    currentLanguage,
    changeLanguage,
    resetToDefaultLanguage
  }
}