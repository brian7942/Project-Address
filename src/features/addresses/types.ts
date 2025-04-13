export interface AddressGenerationRequest {
    latitude: number
    longitude: number
    preferred_sorting?: 'road_based' | 'grid_based' | 'hybrid'
  }
  
  export interface AddressGenerationResponse {
    digital_address: string
    country_code: string
    province_code: string
    city_code: string
    block_number: number
    building_number: number
    latitude: number
    longitude: number
    sorting_type: 'road_based' | 'grid_based' | 'hybrid'
    confidence_score: number
  }
  
  export interface AddressValidationResponse {
    is_valid: boolean
    details?: {
      country_code?: string
      province_code?: string
      city_code?: string
      block_number?: number
      building_number?: number
      has_building?: boolean
    }
  }
  
  export interface NearbyAddressResponse {
    digital_address: string
    building_id: number
    name?: string
    latitude: number
    longitude: number
    distance_meters: number
  }