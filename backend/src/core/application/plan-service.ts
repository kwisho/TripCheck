import { FullPlan, Plan, PlanValidator } from '@trip-check/types'
import { GetPagedResult, ValidateableResponse } from '@trip-check/utils'
import { IPlanRepository, IPlanService } from '../domain/model/plan.js'
import { PlanRepository } from '../infrastructure/repositories/plan-repository.js'

export class PlanService implements IPlanService {
  constructor(private readonly planRepository: IPlanRepository = new PlanRepository()) {}

  public async get(userId: string, id: string): Promise<ValidateableResponse<FullPlan>> {
    const model = await this.planRepository.get(id)
    if (!model || model.userId !== userId) {
      return {
        errors: [`There is not a plan for the id '${id}'.`],
      }
    }
    return { model }
  }

  public async create(userId: string, input: FullPlan): Promise<ValidateableResponse<FullPlan>> {
    const validation = PlanValidator.validate(input)
    if (validation.error) {
      const errors = validation.error.details.map((x) => x.message)
      return { errors }
    }

    // 明示的に userId を埋め込む（セキュリティ確保）
    const planToCreate: FullPlan = {
      ...input,
      userId,
    }

    const model = await this.planRepository.create(planToCreate)
    return { model }
  }

  public async update(userId: string, id: string, input: FullPlan): Promise<ValidateableResponse<FullPlan>> {
    const validation = PlanValidator.validate(input)
    if (validation.error) {
      const errors = validation.error.details.map((x) => x.message)
      return { errors }
    }

    const existing = await this.planRepository.get(id)
    if (!existing || existing.userId !== userId) {
      return { errors: [`You do not have permission to update this plan.`] }
    }

    const updated = await this.planRepository.update(id, input)

    return { model: updated }
  }
  public async delete(userId: string, id: string): Promise<ValidateableResponse<boolean>> {
    const existing = await this.planRepository.get(id)
    if (!existing || existing.userId !== userId) {
      return { errors: [`You do not have permission to delete this plan.`] }
    }

    const result = await this.planRepository.delete(id)
    return { model: result }
  }

  public async getPaged(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    advisability?: boolean | null,
    count?: number,
    nextToken?: string,
  ): Promise<ValidateableResponse<GetPagedResult<Plan>>> {
    console.log('PlanService.getPaged called')
    const result = await this.planRepository.getPagedByFilters(
      userId,
      startDate,
      endDate,
      advisability ?? undefined,
      count,
      nextToken,
    )
    return {
      model: result,
    }
  }
}
