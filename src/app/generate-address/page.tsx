'use client'

import dynamic from 'next/dynamic'

// 클라이언트에서만 렌더링하도록 설정된 컴포넌트
const GenerateAddressPage = dynamic(() => import('@/components/map/GenerateAddressPage'), {
  ssr: false,
})

export default function Page() {
  return <GenerateAddressPage />
}
