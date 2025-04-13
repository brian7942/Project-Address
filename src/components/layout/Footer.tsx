"use client"

import Link from 'next/link'
import { Github, Twitter, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { 
      href: 'https://github.com/your-org/digital-address-system', 
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub'
    },
    { 
      href: 'https://twitter.com/your-org', 
      icon: <Twitter className="w-6 h-6" />,
      label: 'Twitter'
    },
    { 
      href: 'https://facebook.com/your-org', 
      icon: <Facebook className="w-6 h-6" />,
      label: 'Facebook'
    }
  ]

  const footerLinks = [
    { href: '/about', label: '소개' },
    { href: '/terms', label: '이용약관' },
    { href: '/privacy', label: '개인정보 처리방침' },
    { href: '/contact', label: '문의' }
  ]

  return (
    <footer className="bg-gray-100 py-8 mt-10">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        {/* 로고 및 설명 */}
        <div>
          <h2 className="text-xl font-bold text-primary-600 mb-4">
            디지털 주소 시스템
          </h2>
          <p className="text-gray-600 text-sm">
            AI 기반 하이브리드 디지털 주소 시스템으로 정확하고 혁신적인 위치 정보를 제공합니다.
          </p>
        </div>

        {/* 빠른 링크 */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">빠른 링크</h3>
          <nav className="space-y-2">
            {footerLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="block text-gray-600 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* 소셜 미디어 링크 */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">소셜 미디어</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a 
                key={social.href}
                href={social.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-600 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 저작권 */}
      <div className="border-t border-gray-200 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-600">
          © {currentYear} 디지털 주소 시스템. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer