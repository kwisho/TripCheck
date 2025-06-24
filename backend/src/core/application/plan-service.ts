import { Plan, PlanValidator } from '@trip-check/types'
import { ValidateableResponse } from '@trip-check/utils'
import { IPlanRepository, IPlanService } from '../domain/model/plan.js'
import { GetPagedResult } from '../domain/repository/base-repository.js'
import { PlanRepository } from '../infrastructure/repositories/plan-repository.js'

export class PlanService implements IPlanService {
  constructor(private readonly planRepository: IPlanRepository = new PlanRepository()) {}

  public async get(id: string): Promise<ValidateableResponse<Plan>> {
    const model = await this.planRepository.get(id)
    if (!model) {
      return {
        errors: [`There is not a plan for the id '${id}'.`],
      }
    }
    return { model }
  }

  public async create(input: Plan): Promise<ValidateableResponse<Plan>> {
    // validate the plan object
    const validation = PlanValidator.validate(input)

    if (validation.error) {
      const errors = validation.error.details.map((x) => x.message)
      return { errors }
    }

    // create the plan on the database
    const model = await this.planRepository.create(input)
    return { model }
  }

  public async update(id: string, input: Plan): Promise<ValidateableResponse<Plan>> {
    const validation = PlanValidator.validate(input)
    if (validation.error) {
      const errors = validation.error.details.map((x) => x.message)
      return { errors }
    }
    const model = await this.planRepository.update(id, input)
    return { model }
  }

  public async delete(id: string): Promise<ValidateableResponse<boolean>> {
    const result = await this.planRepository.delete(id)
    return { model: result }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getPaged(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    count?: number,
    nextToken?: string,
  ): Promise<ValidateableResponse<GetPagedResult<Plan>>> {
    console.log(`Starting checking Plans`)
    console.log(userId)
    console.log(startDate)
    console.log(endDate)
    console.log(count)
    console.log(nextToken)

    // const plans = await this.planRepository.getPlans(userId)
    const plans: Plan[] = [
      {
        id: '1',
        name: '北海道ドライブ旅行',
        startDate: new Date('2025-05-01'),
        endDate: new Date('2025-05-05'),
        description: '札幌から函館までの絶景ドライブ',
        userId: 'user123',
        icon: '🚗',
      },
      {
        id: '2',
        name: 'ランニングマラソン',
        startDate: new Date('2024-05-02'),
        endDate: new Date('2024-05-03'),
        description: '東京で行われる市民マラソンに参加',
        userId: 'user123',
        icon: '🏃',
      },
      {
        id: '3',
        name: '富士山ハイキング',
        startDate: new Date('2024-04-10'),
        endDate: new Date('2024-04-11'),
        description: '富士山周辺をゆったりハイキング',
        userId: 'user123',
        icon: '⛰️',
      },
    ]

    return {
      model: {
        items: plans,
        count: plans.length,
        nextToken: undefined, // ページング未対応の場合は undefined のままでOK
      },
    }
  }
}
