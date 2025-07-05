import { FetchDistanceParams, FetchDistanceResult } from '@trip-check/types'
import { ValidateableResponse } from '@trip-check/utils'

export interface IMapRouteService {
  calculateRoute(input: FetchDistanceParams): Promise<ValidateableResponse<FetchDistanceResult>>
}
