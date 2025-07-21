import { AutocompleteParams, AutocompleteResult, FetchDistanceParams, FetchDistanceResult } from '@trip-check/types'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

if (!API_KEY) {
  throw new Error('Missing GOOGLE_MAPS_API_KEY in environment variables.')
}

/**
 * Google Maps Routes API を用いて距離・所要時間を取得する
 */
export async function fetchDistanceFromGoogleMaps(params: FetchDistanceParams): Promise<FetchDistanceResult> {
  const { fromLocation, toLocation, departureTime, transportType } = params

  const url = 'https://routes.googleapis.com/directions/v2:computeRoutes'

  const requestBody = {
    origin: {
      address: fromLocation.name,
    },
    destination: {
      address: toLocation.name,
    },
    travelMode: transportType,
    languageCode: 'ja',
    departureTime: departureTime.toISOString(),
    computeAlternativeRoutes: false,
    routeModifiers: {
      avoidTolls: false,
      avoidHighways: false,
      avoidFerries: false,
    },
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY as string,
      'X-Goog-FieldMask': '*', // ← 開発時のみ！必要項目がわかったら絞る
    },
    body: JSON.stringify(requestBody),
  })

  const data = await response.json()
  console.log('ステータス:', response.status)
  console.log('レスポンス:', JSON.stringify(data, null, 2))

  const leg = data?.routes?.[0]?.legs?.[0]

  if (!leg) {
    throw new Error(`Invalid response from Routes API: ${JSON.stringify(data)}`)
  }

  return {
    durationMinutes: Math.ceil(leg.duration?.seconds / 60),
    distanceMeters: leg.distanceMeters,
    summary: `${Math.ceil(leg.duration?.seconds / 60)}分 / ${(leg.distanceMeters / 1000).toFixed(1)} km`,
  }
}

/**
 * Google Places Autocomplete API を用いてオートコンプリート候補を取得する
 */
export async function fetchAutocompleteSuggestions(params: AutocompleteParams): Promise<AutocompleteResult> {
  const { input, location, language, sessionToken } = params

  const url = new URL('https://maps.googleapis.com/maps/api/place/autocomplete/json')

  url.searchParams.set('input', input)

  if (location?.lat && location?.lng) {
    url.searchParams.set('location', `${location.lat},${location.lng}`)
  }
  if (sessionToken) {
    url.searchParams.set('sessiontoken', sessionToken)
  }
  url.searchParams.set('language', language)
  url.searchParams.set('key', API_KEY as string)

  const response = await fetch(url.toString())
  const data = await response.json()

  console.log('ステータス:', response.status)
  console.log('レスポンス:', JSON.stringify(data, null, 2))
  return {
    predictions: data.predictions.map((prediction: { place_id: string; description: string }) => ({
      placeId: prediction.place_id,
      description: prediction.description,
    })),
  }
}
