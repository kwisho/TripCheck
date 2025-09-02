import { FullPlan, Plan } from '@trip-check/types'
import { GetPagedResult, ValidateableResponse } from '@trip-check/utils'
import { IBaseRepository, UpdateModel } from '../repository/base-repository'

export interface IPlanRepository extends IBaseRepository<FullPlan> {
  get(id: string): Promise<FullPlan | undefined>
  create(plan: FullPlan): Promise<FullPlan>
  update(id: string, entity: FullPlan, updateModel?: UpdateModel): Promise<FullPlan>
  delete(id: string): Promise<boolean>

  getPagedByFilters(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    advisability?: boolean,
    count?: number,
    nextToken?: string,
  ): Promise<GetPagedResult<Plan>>
}

export interface IPlanService {
  get(userId: string, id: string): Promise<ValidateableResponse<FullPlan>>

  create(userId: string, input: FullPlan): Promise<ValidateableResponse<FullPlan>>

  update(userId: string, id: string, input: FullPlan): Promise<ValidateableResponse<FullPlan>>

  delete(userId: string, id: string): Promise<ValidateableResponse<boolean>>

  getPaged(
    userId: string,
    startDate?: Date,
    endDate?: Date,
    advisability?: boolean | null,
    count?: number,
    nextToken?: string,
  ): Promise<ValidateableResponse<GetPagedResult<Plan>>>
}
