"use client"

import { ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface LayoutProps {
  children: ReactNode
  className?: string
}

const Layout = ({ children, className = '' }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* 메인 콘텐츠 영역 - 헤더 높이만큼 패딩 추가 */}
      <main className={`flex-grow pt-16 ${className}`}>
        {children}
      </main>
      
      <Footer />
    </div>
  )
}

export default Layout