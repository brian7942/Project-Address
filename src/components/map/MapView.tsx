"use client"

import { useTranslation } from 'react-i18next'
import { useState, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet'
import { LatLng, LatLngExpression, icon } from 'leaflet'
import * as LucideIcons from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useAddressGeneration } from '@/features/addresses/api'
import 'leaflet/dist/leaflet.css'

// 기본 마커 아이콘 설정
const defaultIcon = icon({
 iconUrl: '/marker-icon.png',
 iconRetinaUrl: '/marker-icon-2x.png',
 shadowUrl: '/marker-shadow.png',
 iconSize: [25, 41],
 iconAnchor: [12, 41],
 popupAnchor: [1, -34],
 shadowSize: [41, 41]
})

// 라오스 중심 좌표
const LAOS_CENTER: LatLngExpression = [18.0398, 102.6607]

// URL 파라미터에 따라 지도 중심 설정하는 컴포넌트
interface MapInitializerProps {
 setSelectedLocation: React.Dispatch<React.SetStateAction<{
   lat: number;
   lng: number;
 } | null>>;
}

const MapInitializer = ({ setSelectedLocation }: MapInitializerProps) => {
 const map = useMap();
 const searchParams = useSearchParams();
 
 useEffect(() => {
   const lat = searchParams.get('lat');
   const lng = searchParams.get('lng');
   
   if (lat && lng) {
     const position: LatLngExpression = [parseFloat(lat), parseFloat(lng)];
     map.flyTo(position, 12);
     setSelectedLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
   }
 }, [searchParams, map, setSelectedLocation]);
 
 return null;
}

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

const MapPage = () => {
  const { t } = useTranslation();
  
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number, 
    lng: number
  } | null>(null);
  const [showAddressPanel, setShowAddressPanel] = useState(false);
 
 // 주소 생성 API 훅 추가
 const { 
   generatedAddress, 
   generateAddress, 
   isLoading, 
   error 
 } = useAddressGeneration();

 const handleLocationSelect = useCallback((lat: number, lng: number) => {
   setSelectedLocation({ lat, lng });
   setShowAddressPanel(true); // 위치 선택 시 패널 표시
 }, []);

 // 주소 생성 함수
 const handleGenerateAddress = useCallback(async () => {
   if (!selectedLocation) return;

   await generateAddress({
     latitude: selectedLocation.lat,
     longitude: selectedLocation.lng,
     preferred_sorting: 'hybrid' // 기본값
   });
 }, [selectedLocation, generateAddress]);

 return (
  <div className="w-full h-[calc(100vh-4rem)] relative">
    <MapContainer 
      center={LAOS_CENTER} 
      zoom={10} 
      style={{ height: '100%', width: '100%' }}
      className="z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <MapInitializer setSelectedLocation={setSelectedLocation} />
      <LocationMarker onLocationSelect={handleLocationSelect} />
    </MapContainer>

    {/* 선택된 위치 정보 */}
    {selectedLocation && (
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-white shadow-md rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <LucideIcons.MapPin className="w-6 h-6 text-primary-600" />
          <div>
            <p className="font-semibold">{t('map.selectedLocation')}</p>
            <p className="text-sm text-gray-600">
              {t('common.latitude')}: {selectedLocation.lat.toFixed(6)}
              <br />
              {t('common.longitude')}: {selectedLocation.lng.toFixed(6)}
            </p>
          </div>
        </div>
        
        {/* 주소 생성 버튼 추가 */}
        <button 
          onClick={handleGenerateAddress}
          disabled={isLoading}
          className="mt-2 w-full bg-primary-600 text-white py-2 rounded-md hover:bg-primary-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? t('address.generation.generating') : t('address.generation.generate')}
        </button>
      </div>
    )}

    {/* 생성된 주소 표시 패널 */}
    {generatedAddress && (
      <div className="absolute top-4 right-4 z-[1000] bg-white shadow-md rounded-lg p-4 max-w-sm">
        <h3 className="font-bold text-lg mb-2">{t('address.generation.details.digitalAddress')}</h3>
        <p className="font-mono bg-gray-100 p-2 rounded mb-2">
          {generatedAddress.digital_address}
        </p>
        <div className="text-sm">
          <p>{t('address.generation.details.countryCode')}: {generatedAddress.country_code}</p>
          <p>{t('address.generation.details.provinceCode')}: {generatedAddress.province_code}</p>
          <p>{t('address.generation.details.cityCode')}: {generatedAddress.city_code}</p>
          <p>{t('address.generation.details.blockNumber')}: {generatedAddress.block_number}</p>
          <p>{t('address.generation.details.buildingNumber')}: {generatedAddress.building_number}</p>
        </div>
        <button 
          onClick={() => {
            navigator.clipboard.writeText(generatedAddress.digital_address);
            alert(t('address.generation.addressCopied'));
          }}
          className="mt-2 text-primary-600 hover:text-primary-700 flex items-center"
        >
          <LucideIcons.Copy className="w-4 h-4 mr-1" />
          {t('common.copy')}
        </button>
      </div>
    )}

    {/* 에러 메시지 표시 */}
    {error && (
      <div className="absolute top-4 left-4 z-[1000] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
      </div>
    )}
  </div>
)
}

export default MapPage