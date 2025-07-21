import { TransportType } from '@trip-check/types'
import { badRequest, ok } from '@trip-check/utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import dotenv from 'dotenv'
import { IMapRouteService } from '../core/domain/model/map-route'
import { MapRouteService } from '../core/application/map-route-service'
dotenv.config()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Query params:', event.queryStringParameters)
    console.log('Headers:', event.headers)
    console.log('Body:', event.body)

    const query = event.queryStringParameters ?? {}

    if (!query.input || !query.language) {
      return badRequest('Required query parameter is missing.')
    }

    const mapRouteService: IMapRouteService = new MapRouteService()
    const result = await mapRouteService.getAutocompleteSuggestions({
      input: query.input,
      language: query.language,
      sessionToken: query.sessionToken,
      location: query.location ? JSON.parse(query.location) : undefined,
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
