import joi from 'joi'
import { BaseEntity } from './base'

export type PlanItemTag = BaseEntity & {
  /** 関連付ける旅程のID */
  planId: string
  /** 関連付けるタグのID */
  tagId: string
}

export const PlanItemTagValidator = joi.object<PlanItemTag>().keys({
  id: joi.string().optional(),
  planId: joi.string().required(),
  tagId: joi.string().required(),
})
