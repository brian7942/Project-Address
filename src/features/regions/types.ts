import { Geometry } from 'geojson'

export interface AdministrativeRegion {
  id: number
  country_code: string
  province_code: string
  city_code: string
  village_code: string
  village_name: string
  population: number
  geometry: Geometry
  block_count?: number
  hundred_digit?: number
  created_at: string
  updated_at: string
}

export interface BlockInfo {
  id: number
  block_number: number
  village_id: number
  geometry: Geometry
  buildings_count: number
  created_at: string
  updated_at: string
}

export interface RegionSearchParams {
  longitude: number
  latitude: number
}

export interface BlockSearchParams {
  village_id?: number
  north?: number
  south?: number
  east?: number
  west?: number
}

export interface VillageCodeAssignmentResponse {
  assigned_codes: {
    [key: number]: {
      village_name: string
      hundred_digit: number
      population: number
      population_rank: number
    }
  }
}