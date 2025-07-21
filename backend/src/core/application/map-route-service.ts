import { AutocompleteResult, FetchDistanceResult } from '@trip-check/types'
import { ValidateableResponse } from '@trip-check/utils'
import { CalculateRouteCommand } from '../domain/command/calculate-route-command'
import { fetchAutocompleteSuggestions, fetchDistanceFromGoogleMaps } from '../infrastructure/external/google-maps-api'
import { AutoCompleteSuggestionsCommand } from '../domain/command/autocomplete-Suggestions-command'
import { error } from 'console'

export class MapRouteService {
  /**
   * マップから経路情報を計算する
   * @param {CalculateRouteCommand} command
   * @returns
   */
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

  /**
   * Googleマップからオーとコンプリートをサジェストする
   * @param {AutoCompleteSuggestionsCommand} command
   * @returns
   */
  public async getAutocompleteSuggestions(
    command: AutoCompleteSuggestionsCommand,
  ): Promise<ValidateableResponse<AutocompleteResult>> {
    try {
      const result = await fetchAutocompleteSuggestions({
        input: command.input,
        location: command.location,
        sessionToken: command.sessionToken,
        language: command.language ?? 'ja',
      })
      return { model: result }
    } catch (e: unknown) {
      console.log(e)
      return {
        errors: ['経路オートコンプリートに取得に失敗しました'],
      }
    }
  }
}
