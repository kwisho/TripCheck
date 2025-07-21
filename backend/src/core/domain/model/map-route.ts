import {
  AutocompletePrediction,
  AutocompleteParams,
  FetchDistanceParams,
  FetchDistanceResult,
  AutocompleteResult,
} from '@trip-check/types'
import { ValidateableResponse } from '@trip-check/utils'

export interface IMapRouteService {
  /** 経路を計算 */
  calculateRoute(input: FetchDistanceParams): Promise<ValidateableResponse<FetchDistanceResult>>
  /** オートコンプリート推測取得 */
  getAutocompleteSuggestions(input: AutocompleteParams): Promise<ValidateableResponse<AutocompleteResult>>
}
