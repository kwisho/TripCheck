import { Location } from "./location"
import { TransportType } from "./route-segment"

export type FetchDistanceParams = {
    fromLocation: Location
    toLocation: Location
    departureTime: Date
    transportType: TransportType
  }
  
  export type FetchDistanceResult = {
    durationMinutes: number
    distanceMeters: number
    summary: string
  }
  