import { useState, useCallback } from 'react'
import apiClient from '@/lib/api'
import {
  AddressGenerationRequest,
  AddressGenerationResponse,
  AddressValidationResponse,
  NearbyAddressResponse
} from './types'

export const useAddressGeneration = () => {
  const [generatedAddress, setGeneratedAddress] = useState<AddressGenerationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateAddress = useCallback(async (request: AddressGenerationRequest) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.post<AddressGenerationResponse>('/addresses/generate', request)
      
      setGeneratedAddress(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '주소 생성 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('주소 생성 오류:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    generatedAddress, 
    generateAddress, 
    isLoading, 
    error 
  }
}

export const useAddressValidation = () => {
  const [validationResult, setValidationResult] = useState<AddressValidationResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const validateAddress = useCallback(async (address: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<AddressValidationResponse>(`/addresses/validate/${address}`)
      
      setValidationResult(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '주소 검증 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('주소 검증 오류:', err)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    validationResult, 
    validateAddress, 
    isLoading, 
    error 
  }
}

export const useNearbyAddresses = () => {
  const [nearbyAddresses, setNearbyAddresses] = useState<NearbyAddressResponse[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const findNearbyAddresses = useCallback(async (address: string, radius: number = 100) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<NearbyAddressResponse[]>('/addresses/nearby', {
        params: {
          digital_address: address,
          radius
        }
      })
      
      setNearbyAddresses(response.data)
      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : '주변 주소 검색 중 알 수 없는 오류가 발생했습니다.'
      
      setError(errorMessage)
      console.error('주변 주소 검색 오류:', err)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { 
    nearbyAddresses, 
    findNearbyAddresses, 
    isLoading, 
    error 
  }
}