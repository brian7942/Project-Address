"use client"

import { useState, useCallback } from 'react'
import * as LucideIcons from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { LatLng, LatLngExpression } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { useAddressGeneration } from '@/features/addresses/api'
import { AddressGenerationResponse } from '@/features/addresses/types'
export const dynamic = "force-dynamic";

// 기본 마커 아이콘 설정
const defaultIcon = new L.Icon({
  iconUrl: '/marker-icon.png',
  iconRetinaUrl: '/marker-icon-2x.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

// 라오스 중심 좌표
const LAOS_CENTER: LatLngExpression = [19.8563, 102.4955]

// 좌표 선택 컴포넌트
const LocationMarker = ({ 
  onLocationSelect 
}: { 
  onLocationSelect: (lat: number, lng: number) => void 
}) => {
  const [position, setPosition] = useState<LatLng | null>(null)
  
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setPosition(e.latlng)
      onLocationSelect(lat, lng)
      
      // 선택된 위치로 지도 중심 이동
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return position === null ? null : (
    <Marker 
      position={position} 
      icon={defaultIcon}
    >
      <Popup>선택된 위치</Popup>
    </Marker>
  )
}

const GenerateAddressPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number, 
    lng: number
  } | null>(null)
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(LAOS_CENTER)
  const [sortingType, setSortingType] = useState<'road_based' | 'grid_based' | 'hybrid'>('hybrid')
  const [generatedAddress, setGeneratedAddress] = useState<AddressGenerationResponse | null>(null)

  const { 
    generatedAddress: apiGeneratedAddress, 
    generateAddress, 
    isLoading, 
    error 
  } = useAddressGeneration()

  const handleLocationSelect = useCallback((lat: number, lng: number) => {
    setSelectedLocation({ lat, lng })
    setMapCenter([lat, lng])
  }, [])

  const handleGenerateAddress = useCallback(async () => {
    if (!selectedLocation) return

    const result = await generateAddress({
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
      preferred_sorting: sortingType
    })

    if (result) {
      setGeneratedAddress(result)
    }
  }, [selectedLocation, sortingType, generateAddress])

  const handleCopyAddress = () => {
    if (typeof window !== 'undefined' && generatedAddress) {
      navigator.clipboard.writeText(generatedAddress.digital_address)
        .then(() => alert('주소가 복사되었습니다.'))
        .catch(err => console.error('복사 중 오류 발생:', err))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">디지털 주소 생성</h1>

      {/* 지도 및 주소 생성 섹션 */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 지도 컨테이너 */}
        <div className="h-[500px] relative">
          <MapContainer 
            center={mapCenter} 
            zoom={7} 
            style={{ height: '100%', width: '100%' }}
            className="z-10 rounded-lg shadow-md"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <LocationMarker onLocationSelect={handleLocationSelect} />
          </MapContainer>

          {/* 선택된 위치 정보 */}
          {selectedLocation && (
            <div className="absolute bottom-4 left-4 z-[1000] bg-white shadow-md rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <LucideIcons.MapPin className="w-6 h-6 text-primary-600" />
                <div>
                  <p className="font-semibold">선택된 위치</p>
                  <p className="text-sm text-gray-600">
                    위도: {selectedLocation.lat.toFixed(6)}
                    <br />
                    경도: {selectedLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 주소 생성 옵션 및 결과 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">정렬 방식 선택</label>
            <div className="grid grid-cols-3 gap-2">
              {(['road_based', 'grid_based', 'hybrid'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSortingType(type)}
                  className={`py-2 rounded-md transition-colors ${
                    sortingType === type 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {type === 'road_based' ? '도로 기반' : 
                   type === 'grid_based' ? '그리드 기반' : 
                   '하이브리드'}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleGenerateAddress}
            disabled={!selectedLocation || isLoading}
            className="w-full bg-primary-600 text-white py-2 rounded-md mb-4 
                       hover:bg-primary-700 transition-colors 
                       disabled:opacity-50 disabled:cursor-not-allowed flex 
                       items-center justify-center"
          >
            {isLoading ? (
              <div className="animate-spin mr-2">
                <LucideIcons.Loader2 className="w-5 h-5" />
              </div>
            ) : (
              <LucideIcons.MapPin className="w-5 h-5 mr-2" />
            )}
            {isLoading ? '주소 생성 중...' : '주소 생성'}
          </button>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {generatedAddress && (
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-green-800">생성된 주소</h3>
                <button 
                  onClick={handleCopyAddress}
                  className="text-primary-600 hover:text-primary-700 flex items-center"
                >
                  <LucideIcons.Copy className="w-5 h-5 mr-1" />
                  복사
                </button>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>디지털 주소:</strong>{' '}
                  <span className="text-green-700 font-mono">
                    {generatedAddress.digital_address}
                  </span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <p>
                    <strong>국가 코드:</strong>{' '}
                    {generatedAddress.country_code}
                  </p>
                  <p>
                    <strong>주 코드:</strong>{' '}
                    {generatedAddress.province_code}
                  </p>
                  <p>
                    <strong>시/군 코드:</strong>{' '}
                    {generatedAddress.city_code}
                  </p>
                  <p>
                    <strong>블록 번호:</strong>{' '}
                    {generatedAddress.block_number}
                  </p>
                  <p>
                    <strong>건물 번호:</strong>{' '}
                    {generatedAddress.building_number}
                  </p>
                  <p>
                    <strong>정렬 방식:</strong>{' '}
                    {generatedAddress.sorting_type === 'road_based' ? '도로 기반' : 
                     generatedAddress.sorting_type === 'grid_based' ? '그리드 기반' : 
                     '하이브리드'}
                  </p>
                </div>
                <p>
                  <strong>신뢰도:</strong>{' '}
                  <span className={`
                    ${generatedAddress.confidence_score >= 0.8 ? 'text-green-600' : 
                      generatedAddress.confidence_score >= 0.5 ? 'text-yellow-600' : 
                      'text-red-600'}`
                  }>
                    {(generatedAddress.confidence_score * 100).toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateAddressPage