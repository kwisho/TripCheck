/* eslint-disable @typescript-eslint/require-await */
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { dummyFullPlan } from '@fixtures/dummyPlans'
import { FullPlan, Plan } from '@trip-check/types'
import { fromISOToDate, GetPagedResult } from '@trip-check/utils'
import { IPlanRepository } from 'src/core/domain/model/plan.js'
import { ddb } from '../dynamo.js'
import { BaseDynamoRepository } from './base-dynamodb-repository.js'
/**
 * Implementation for IPlanRepository using DynamoDB as the data source.
 * @param ddbDocumentClient Instance for DynamoDBDocumentClient.
 * @returns An instance of the derived repository class tßo handle entity.
 * @see BaseDynamoRepository
 * @see IPlanRepository
 * @see Plan
 */

export class PlanRepository extends BaseDynamoRepository<Plan> implements IPlanRepository {
  constructor(ddbDocumentClient: DynamoDBDocumentClient = ddb) {
    super(ddbDocumentClient, 'user')
  }

  protected override mapEntity(record: Record<string, unknown>): Plan {
    record.birthday = fromISOToDate(record.birthday as string)
    return record as Plan
  }

  protected override handleModel(entity: Plan): Plan {
    const model = entity as Record<string, unknown>
    model.gsi1pk = `${entity.id}`
    return entity
  }

  public async get(id: string): Promise<FullPlan> {
    // planに紐づいているplanItemとtag,そのPlanItemに紐づくRouteSegmentとlocationを取得
    const plan = dummyFullPlan(id)
    console.log('get:', plan)
    return plan
  }

  public async getPagedByFilters(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    advisability?: boolean,
    count?: number,
    nextToken?: string,
  ): Promise<GetPagedResult<Plan>> {
    console.log(userId)
    console.log(startDate)
    console.log(endDate)
    console.log(advisability)
    console.log(count)
    console.log(nextToken)
    const plans: Plan[] = [
      {
        id: '1',
        name: '北海道ドライブ旅行',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-05-05'),
        description: '札幌から函館までの絶景ドライブ',
        advisability: true,
        userId: 'user123',
        imageUrl: 'https://picsum.photos/200/300',
      },
      {
        id: '2',
        name: 'ランニングマラソン',
        startDate: new Date('2024-05-02'),
        endDate: new Date('2024-05-03'),
        description: '東京で行われる市民マラソンに参加',
        advisability: false,
        userId: 'user123',
        imageUrl: 'https://picsum.photos/200/300',
      },
    ]
    return {
      items: plans,
    }
  }
}
