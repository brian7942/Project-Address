export interface Building {
  id: number
  name?: string
  building_type?: string
  latitude: number
  longitude: number
  block_id?: number
  building_number?: number
  digital_address?: string
  osm_id?: number
  created_at: string
  updated_at: string
}

export interface BuildingSearchParams {
  north: number
  south: number
  east: number
  west: number
  include_address?: boolean
}