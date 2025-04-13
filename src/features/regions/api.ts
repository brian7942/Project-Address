import { useState, useCallback } from 'react'
import apiClient from '@/lib/api'
import {
  AdministrativeRegion,
  BlockInfo,
  RegionSearchParams,
  BlockSearchParams,
  VillageCodeAssignmentResponse
} from './types'

export const useRegionSearch = () => {
  const [region, setRegion] = useState<AdministrativeRegion | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchRegion = useCallback(async (params: RegionSearchParams) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<AdministrativeRegion>('/admin/boundaries', {
        params: {
          longitude: params.longitude,
          latitude: params.latitude
        }
      })
      
      setRegion(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '행정구역 검색 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('행정구역 검색 오류:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    region, 
    searchRegion, 
    isLoading, 
    error 
  }
}

export const useBlockSearch = () => {
  const [blocks, setBlocks] = useState<BlockInfo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const searchBlocks = useCallback(async (params: BlockSearchParams) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<BlockInfo[]>('/admin/blocks', {
        params: {
          village_id: params.village_id,
          north: params.north,
          south: params.south,
          east: params.east,
          west: params.west
        }
      })
      
      setBlocks(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '블록 검색 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('블록 검색 오류:', err)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    blocks, 
    searchBlocks, 
    isLoading, 
    error 
  }
}

export const useVillageCodeAssignment = () => {
  const [assignedCodes, setAssignedCodes] = useState<VillageCodeAssignmentResponse['assigned_codes']>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const assignVillageCodes = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.post<VillageCodeAssignmentResponse>('/admin/village-codes/assign')
      
      setAssignedCodes(response.data.assigned_codes)
      return response.data.assigned_codes
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '마을 코드 할당 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('마을 코드 할당 오류:', err)
      return {}
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    assignedCodes, 
    assignVillageCodes, 
    isLoading, 
    error 
  }
}