import { ValidateableResponse } from '../../../utils/validateable-response.js'
import { GetPagedResult, IBaseRepository } from '../repository/base-repository.js'
import { BaseEntity } from './base.js'
import joi from 'joi'

/** Plan entity for TripCheck (travel itinerary plan) */
export type Plan = BaseEntity & {
  name: string // 旅程プラン名
  startDate: Date // 旅程開始日
  endDate: Date // 旅程終了日
  description?: string // プランの説明やメモ
  userId: string // プラン所有者のユーザーID
}

export interface IPlanRepository extends IBaseRepository<Plan> {
  getPlans(userId: string): Promise<GetPagedResult<Plan>>
}

export interface IPlanService {
  get(id: string): Promise<ValidateableResponse<Plan>>
  create(input: Plan): Promise<ValidateableResponse<Plan>>
  update(id: string, input: Plan): Promise<ValidateableResponse<Plan>>
  delete(id: string): Promise<ValidateableResponse<boolean>>
  getPlans(userId: string): Promise<GetPagedResult<Plan>>
}

export const PlanValidator = joi.object<Plan>().keys({
  name: joi.string().required().min(3).max(250),
  startDate: joi.date().required(),
  endDate: joi.date().required().min(joi.ref('startDate')), // 終了日は開始日以降
  description: joi.string().max(1000).optional(),
  userId: joi.string().required(),
})
