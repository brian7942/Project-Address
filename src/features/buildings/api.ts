import { useState, useCallback } from 'react'
import apiClient from '@/lib/api'
import { Building, BuildingSearchParams } from './types'

export const useBuildingSearch = () => {
  const [buildings, setBuildings] = useState<Building[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchBuildings = useCallback(async (params: BuildingSearchParams) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<Building[]>('/buildings', { 
        params: {
          north: params.north,
          south: params.south,
          east: params.east,
          west: params.west,
          include_address: params.include_address || false
        }
      })

      setBuildings(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '건물 검색 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('건물 검색 오류:', err)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    buildings, 
    searchBuildings, 
    isLoading, 
    error 
  }
}

export const useBuildingByAddress = () => {
  const [building, setBuilding] = useState<Building | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchByAddress = useCallback(async (address: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<Building>(`/buildings/by-address/${address}`)
      
      setBuilding(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '주소로 건물을 찾는 중 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('주소 검색 오류:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    building, 
    searchByAddress, 
    isLoading, 
    error 
  }
}