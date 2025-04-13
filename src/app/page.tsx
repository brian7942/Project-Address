'use client'

import dynamic from 'next/dynamic'

const MapPage = dynamic(() => import('@/components/map/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-primary-600"></div>
    </div>
  )
})

export default function Map() {
  return <MapPage />
}
