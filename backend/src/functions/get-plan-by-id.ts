import { badRequest, ok } from '@trip-check/utils'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { PlanService } from 'src/core/application/plan-service.js'
import { IPlanService } from 'src/core/domain/model/plan.js'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log('Query params:', event.queryStringParameters)
    console.log('Headers:', event.headers)
    console.log('Body:', event.body)
    const claims = event.requestContext?.authorizer?.jwt?.claims

    const userId = claims?.sub as string
    if (!userId) {
      return badRequest('not found userId')
    }

    const id = event.pathParameters?.id
    console.log('id:', id)

    if (!id) {
      return badRequest('planId query parameter is required.')
    }

    const planService: IPlanService = new PlanService()
    const result = await planService.get(id)

    console.log('result:', result)

    return ok(result.model)
  } catch (error) {
    console.error('Error occurred:', error)

    // 予期しないエラーは400や500で返す（必要に応じて調整）
    return badRequest({ message: 'Unexpected error occurred.' })
  }
}
