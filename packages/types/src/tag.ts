import joi from 'joi'
import { BaseEntity } from './base'

export type Tag = BaseEntity & {
  /** タグ名（例：観光、食事など） */
  name: string
}

export const TagValidator = joi.object<Tag>().keys({
  id: joi.string().optional(),
  name: joi.string().required().max(50),
})

