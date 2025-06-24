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

    // Cognitoのsub（ユーザーID）を使うのが一般的
    const userId = claims?.sub as string
    if (!userId) {
      return badRequest('not found userId')
    }
    // 例としてクエリパラメータが必須ならチェック（必要なければ省略可）
    // もしクエリパラメータで何か受け取る想定があればここでチェック
    // const { someParam } = event.queryStringParameters || {}
    // if (!someParam) {
    //   return badRequest('someParam query parameter is required.')
    // }
    //  const { startDate, endDate, from, to, nextToken } = event.queryStringParameters

    const startDate = new Date()
    const endDate = new Date()

    const planService: IPlanService = new PlanService()
    const result = await planService.getPaged(userId, startDate, endDate, 10, '')

    return ok(result.model)
  } catch (error) {
    console.error('Error occurred:', error)

    // 予期しないエラーは400や500で返す（必要に応じて調整）
    return badRequest({ message: 'Unexpected error occurred.' })
  }
}
