declare module 'lucide-react' {
  import React, { ComponentType, SVGAttributes } from 'react'

  export interface LucideProps extends SVGAttributes<SVGElement> {
    size?: number | string
    absoluteStrokeWidth?: boolean
  }

  export type LucideIcon = ComponentType<LucideProps>

  export const MapPin: LucideIcon
  export const Search: LucideIcon
  export const Home: LucideIcon
  export const Map: LucideIcon
  export const Building2: LucideIcon
  export const Github: LucideIcon
  export const Twitter: LucideIcon
  export const Facebook: LucideIcon
  export const Loader2: LucideIcon
  export const Copy: LucideIcon
}