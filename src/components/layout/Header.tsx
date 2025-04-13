"use client"

import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Home, Map, Building2 } from 'lucide-react'
import { LanguageSelector } from '@/components/common/LanguageSelector'
import AddressSearch from '@/components/common/AddressSearch'
import { useRouter } from 'next/navigation'
import 'leaflet/dist/leaflet.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { 
      href: '/', 
      icon: <Home className="w-5 h-5" />, 
      label: t('common.home')
    },
    { 
      href: '/map', 
      icon: <Map className="w-5 h-5" />, 
      label: t('common.map')
    },
  ]

  const handleSearch = (lat: number, lng: number) => {
    // 검색 결과를 가지고 지도 페이지로 이동
    router.push(`/map?lat=${lat}&lng=${lng}`)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-soft">
      <div className="container mx-auto px-4 py-3 flex items-center">
        {/* 로고 */}
        <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
          <div className="text-xl font-bold">
            <span className="text-black">Project</span>
            <span className="text-primary-600">:</span>
            <span className="text-orange-500">Address</span>
          </div>
        </ Link>

        {/* 주소 검색 (중앙 배치) */}
        <div className="hidden md:flex mx-auto w-1/3 min-w-[300px]">
          <AddressSearch onSearch={handleSearch} className="w-full" />
        </div>

        {/* 메뉴와 언어 선택기 */}
        <div className="flex-shrink-0 hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link 
              key={item.href}
              href={item.href} 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          
          {/* 언어 선택기 */}
          <div className="ml-2">
            <LanguageSelector />
          </div>
        </div>

        {/* 모바일 메뉴 토글 버튼 */}
        <div className="ml-auto md:hidden flex items-center space-x-4">
          {/* 모바일 언어 선택기 */}
          <div>
            <LanguageSelector />
          </div>

          <button 
            onClick={toggleMenu} 
            className="focus:outline-none"
          >
            {isMenuOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              </svg>
            )}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
            {/* 모바일에서의 주소 검색 */}
            <div className="p-4">
              <AddressSearch onSearch={handleSearch} className="w-full" />
            </div>
            
            <nav className="flex flex-col">
              {menuItems.map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header