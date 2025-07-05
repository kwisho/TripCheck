import { FetchDistanceResult } from '@trip-check/types'
import { ValidateableResponse } from '@trip-check/utils'
import { CalculateRouteCommand } from '../domain/command/calculate-route-command'
import { fetchDistanceFromGoogleMaps } from '../infrastructure/external/google-maps-api'

export class MapRouteService {
  public async calculateRoute(command: CalculateRouteCommand): Promise<ValidateableResponse<FetchDistanceResult>> {
    try {
      const result = await fetchDistanceFromGoogleMaps({
        fromLocation: command.fromLocation,
        toLocation: command.toLocation,
        transportType: command.transportType,
        departureTime: command.departureTime,
      })

      return { model: result }
    } catch (e: unknown) {
      console.error(e)
      return {
        errors: ['経路取得に失敗しました'],
      }
    }
  }
}
