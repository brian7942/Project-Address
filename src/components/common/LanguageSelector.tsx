"use client"

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/hooks/useLanguage'

const languageOptions = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'la', name: 'ລາວ', flag: '🇱🇦' }
]

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  const { currentLanguage, changeLanguage } = useLanguage()

  const handleLanguageChange = (lang: string) => {
    changeLanguage(lang)
    setIsOpen(false)
  }

  const selectedLanguage = languageOptions.find(
    (lang) => lang.code === currentLanguage
  )

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 
          bg-white border border-gray-300 rounded-md 
          px-3 py-2 hover:bg-gray-100 transition-colors"
      >
        <span>{selectedLanguage?.flag}</span>
        <span>{selectedLanguage?.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 
          bg-white border border-gray-300 rounded-md 
          shadow-lg z-[1001] overflow-hidden">
          {languageOptions.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`flex items-center space-x-2 w-full px-4 py-2 
                hover:bg-gray-100 transition-colors 
                ${currentLanguage === lang.code 
                  ? 'bg-primary-50 text-primary-600' 
                  : 'text-gray-700'}`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}