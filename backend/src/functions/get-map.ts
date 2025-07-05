import { TransportType } from '@trip-check/types'
import { badRequest, ok } from '@trip-check/utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { MapRouteService } from '../core/application/map-route-service'
import { IMapRouteService } from '../core/domain/model/map-route'
import dotenv from 'dotenv'
dotenv.config()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Query params:', event.queryStringParameters)
    console.log('Headers:', event.headers)
    console.log('Body:', event.body)

    // const claims = event.requestContext?.authorizer?.jwt?.claims
    // const userId = claims?.sub as string

    // if (!userId) {
    //   return badRequest('User ID not found.')
    // }

    const query = event.queryStringParameters ?? {}

    if (!query.fromLocation || !query.toLocation || !query.departureTime || !query.transportType) {
      return badRequest('Required query parameter is missing.')
    }

    let fromLocation, toLocation
    try {
      fromLocation = JSON.parse(query.fromLocation)
      toLocation = JSON.parse(query.toLocation)
    } catch {
      return badRequest('Invalid format for fromLocation or toLocation.')
    }

    // Validate and parse departureTime
    const departureTime = new Date(query.departureTime)
    if (isNaN(departureTime.getTime())) {
      return badRequest('Invalid format for departureTime.')
    }

    const transportType = query.transportType as TransportType

    const mapRouteService: IMapRouteService = new MapRouteService()
    const result = await mapRouteService.calculateRoute({
      fromLocation,
      toLocation,
      departureTime,
      transportType,
    })

    if (!result.model) {
      return badRequest('Failed to retrieve route.')
    }

    return ok(result.model)
  } catch (error) {
    console.error('Error occurred:', error)
    return badRequest({ message: 'Unexpected error occurred.' })
  }
}
