import joi from 'joi'
import { BaseEntity } from './base'

export type PlanItem = BaseEntity & {
  /** 所属する旅程プランのID */
  planId: string
  /** 訪問する場所のID */
  locationId: string
  /** 活動日時（日付単位） */
  date: Date
  /** 活動内容の詳細説明（任意） */
  description?: string
}

export const PlanItemValidator = joi.object<PlanItem>().keys({
  id: joi.string().optional(),
  planId: joi.string().required(),
  locationId: joi.string().required(),
  date: joi.date().required(),
  description: joi.string().max(1000).optional(),
})
