"use client"

import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import * as LucideIcons from 'lucide-react'
import { MapContainer, TileLayer, Marker, GeoJSON } from 'react-leaflet'
import { LatLngExpression, icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Geometry, GeometryCollection } from 'geojson'

import { useRegionSearch, useBlockSearch } from '@/features/regions/api'
import { AdministrativeRegion, BlockInfo } from '@/features/regions/types'

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
const LAOS_CENTER: LatLngExpression = [19.8563, 102.4955]

const getCoordinatesFromGeometry = (geometry: any): LatLngExpression => {
    if (geometry.type === 'Polygon' && geometry.coordinates && geometry.coordinates[0] && geometry.coordinates[0][0]) {
      // Polygon인 경우 첫 번째 좌표 반환
      return [
        geometry.coordinates[0][0][1], 
        geometry.coordinates[0][0][0]
      ];
    } else if (geometry.type === 'Point' && geometry.coordinates) {
      // Point인 경우 해당 좌표 반환
      return [geometry.coordinates[1], geometry.coordinates[0]];
    }
    
    // 기본값 반환
    return LAOS_CENTER;
  };

const RegionsPage = () => {
  const { t } = useTranslation()
  const [selectedRegion, setSelectedRegion] = useState<AdministrativeRegion | null>(null)
  const [selectedBlocks, setSelectedBlocks] = useState<BlockInfo[]>([])
  const [mapCenter, setMapCenter] = useState<LatLngExpression>(LAOS_CENTER)
  const [searchCoords, setSearchCoords] = useState({ 
    longitude: 102.4955, 
    latitude: 19.8563 
  })

  const { 
    region, 
    searchRegion, 
    isLoading: isRegionLoading,
    error: regionError 
  } = useRegionSearch()

  const { 
    blocks, 
    searchBlocks, 
    isLoading: isBlocksLoading,
    error: blocksError 
  } = useBlockSearch()

  const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchCoords(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }))
  }

  const handleSearch = useCallback(async () => {
    try {
      // 행정구역 검색
      const regionResult = await searchRegion({
        longitude: searchCoords.longitude,
        latitude: searchCoords.latitude
      })

      if (regionResult) {
        setSelectedRegion(regionResult)
        setMapCenter(getCoordinatesFromGeometry(regionResult.geometry));

        // 블록 검색
        await searchBlocks({
          village_id: regionResult.id
        })
      }
    } catch (err) {
      console.error('검색 중 오류 발생:', err)
    }
  }, [searchCoords, searchRegion, searchBlocks])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {t('common.regions')}
      </h1>

      {/* 좌표 검색 섹션 */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">경도</label>
            <input 
              type="number" 
              name="longitude"
              value={searchCoords.longitude}
              onChange={handleCoordChange}
              className="w-full border rounded-md px-3 py-2"
              step="0.0001"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">위도</label>
            <input 
              type="number" 
              name="latitude"
              value={searchCoords.latitude}
              onChange={handleCoordChange}
              className="w-full border rounded-md px-3 py-2"
              step="0.0001"
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={handleSearch}
              disabled={isRegionLoading}
              className="bg-primary-600 text-white px-4 py-2 rounded-md 
                         hover:bg-primary-700 transition-colors 
                         disabled:opacity-50 flex items-center"
            >
              {isRegionLoading ? (
                <LucideIcons.Loader2 className="mr-2 animate-spin" />
              ) : (
                <LucideIcons.Search className="mr-2" />
              )}
              검색
            </button>
          </div>
        </div>
      </div>

      {/* 오류 처리 */}
      {(regionError || blocksError) && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {regionError || blocksError}
        </div>
      )}

      {/* 지도 및 행정구역 정보 섹션 */}
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
            
            {/* 행정구역 경계 표시 */}
            {selectedRegion && (
              <GeoJSON 
                data={selectedRegion.geometry} 
                style={() => ({
                  color: "#ff7800",
                  weight: 2,
                  opacity: 0.65,
                  fillOpacity: 0.2
                })}
              />
            )}
          </MapContainer>
        </div>

        {/* 행정구역 상세 정보 */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {selectedRegion ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                행정구역 정보
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong className="text-gray-700">국가 코드:</strong>
                  <p>{selectedRegion.country_code}</p>
                </div>
                <div>
                  <strong className="text-gray-700">주 코드:</strong>
                  <p>{selectedRegion.province_code}</p>
                </div>
                <div>
                  <strong className="text-gray-700">시/군 코드:</strong>
                  <p>{selectedRegion.city_code}</p>
                </div>
                <div>
                  <strong className="text-gray-700">마을 코드:</strong>
                  <p>{selectedRegion.village_code}</p>
                </div>
                <div>
                  <strong className="text-gray-700">마을 이름:</strong>
                  <p>{selectedRegion.village_name}</p>
                </div>
                <div>
                  <strong className="text-gray-700">인구:</strong>
                  <p>{selectedRegion.population.toLocaleString()}명</p>
                </div>
              </div>

              {/* 블록 정보 */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  블록 정보 ({blocks.length}개)
                </h3>
                {isBlocksLoading ? (
                  <div className="flex items-center justify-center">
                    <LucideIcons.Loader2 className="animate-spin" />
                    <span className="ml-2">블록 정보 로딩 중...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {blocks.map((block) => (
                      <div 
                        key={block.id} 
                        className="bg-gray-100 rounded-md p-3 text-sm"
                      >
                        <p>
                          <strong>블록 번호:</strong> {block.block_number}
                        </p>
                        <p>
                          <strong>건물 수:</strong> {block.buildings_count}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              좌표를 입력하여 행정구역을 검색하세요.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RegionsPage