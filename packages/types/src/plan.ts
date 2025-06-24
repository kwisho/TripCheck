import joi from 'joi'
import { BaseEntity } from './base'

export type Plan = BaseEntity & {
  name: string
  startDate: Date
  endDate: Date
  description?: string
  userId: string,
  icon: string
}

export const PlanValidator = joi.object<Plan>().keys({
  id: joi.string().optional(),
  name: joi.string().required().min(3).max(250),
  startDate: joi.date().required(),
  endDate: joi.date().required().min(joi.ref('startDate')),
  description: joi.string().max(1000).optional(),
  userId: joi.string().required(),
  icon: joi.string().max(1000).optional(),
})

