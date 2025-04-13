import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ClientLayout from '@/components/layout/ClientLayout'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin', 'latin-ext'], 
  weight: ['400', '500', '600', '700'] 
})

export const metadata: Metadata = {
  title: 'DIGITAL ADDRESS SYSTEM',
  description: 'AI 기반 하이브리드 디지털 주소 시스템',
  keywords: ['디지털 주소', '위치 서비스', 'AI 주소', '라오스'],
  openGraph: {
    title: '디지털 주소 시스템',
    description: 'AI 기반 하이브리드 디지털 주소 시스템',
    type: 'website',
    locale: 'ko_KR',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} h-full`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}