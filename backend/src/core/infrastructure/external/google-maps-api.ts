// core/infrastructure/external/google-maps-api.ts
import { FetchDistanceParams, FetchDistanceResult } from '@trip-check/types'

const API_KEY = process.env.GOOGLE_MAPS_API_KEY

if (!API_KEY) {
  throw new Error('Missing GOOGLE_MAPS_API_KEY in environment variables.')
}

/**
 * Google Maps Routes API を用いて距離・所要時間を取得
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
      'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration,routes.legs',
    },
    body: JSON.stringify(requestBody),
  })

  console.log(response)
  console.log(await response.json())

  if (!response.ok) {
    throw new Error(`Failed to fetch from Routes API: ${response.statusText}`)
  }

  const data = await response.json()
  console.log(data)

  const leg = data?.routes?.[0]?.legs?.[0]
  console.log(leg)

  if (!leg) {
    throw new Error(`Invalid response from Routes API: ${JSON.stringify(data)}`)
  }

  return {
    durationMinutes: Math.ceil(leg.duration?.seconds / 60),
    distanceMeters: leg.distanceMeters,
    summary: `${Math.ceil(leg.duration?.seconds / 60)}分 / ${(leg.distanceMeters / 1000).toFixed(1)} km`,
  }
}
