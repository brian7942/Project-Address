import axios from 'axios'
import { z } from 'zod'

// Base API Client
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    // 필요시 토큰 추가
    // const token = localStorage.getItem('token')
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`
    // }
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 전역 에러 핸들링
    const status = error.response?.status
    switch (status) {
      case 400:
        console.error('잘못된 요청입니다.')
        break
      case 401:
        console.error('인증되지 않았습니다.')
        break
      case 403:
        console.error('접근 권한이 없습니다.')
        break
      case 404:
        console.error('요청한 리소스를 찾을 수 없습니다.')
        break
      case 500:
        console.error('서버 내부 오류가 발생했습니다.')
        break
      default:
        console.error('알 수 없는 오류가 발생했습니다.')
    }
    return Promise.reject(error)
  }
)

// Zod 스키마를 사용한 검증 예시
export const AddressSchema = z.object({
  digital_address: z.string(),
  country_code: z.string(),
  province_code: z.string(),
  city_code: z.string(),
  block_number: z.number(),
  building_number: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  sorting_type: z.enum(['road_based', 'grid_based', 'hybrid']),
  confidence_score: z.number()
})

export type Address = z.infer<typeof AddressSchema>

export default apiClient