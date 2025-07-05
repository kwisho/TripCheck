import { Plan } from '@trip-check/types'
import { IBaseRepository } from '../repository/base-repository.js'
import { GetPagedResult, ValidateableResponse } from '@trip-check/utils'
export interface IPlanRepository extends IBaseRepository<Plan> {
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
  getPaged(
    userId: string,
    startDate: Date,
    endDate: Date,
    advisability: boolean | null,
    count: number,
    nextToken: string | undefined,
  ): Promise<ValidateableResponse<GetPagedResult<Plan>>>
  get(id: string): Promise<ValidateableResponse<Plan>>
  create(input: Plan): Promise<ValidateableResponse<Plan>>
  update(id: string, input: Plan): Promise<ValidateableResponse<Plan>>
  delete(id: string): Promise<ValidateableResponse<boolean>>
}
