import joi from 'joi'
import { BaseEntity } from './base'

export type Location = BaseEntity & {
  /** 場所名（例：東京タワー） */
  name: string
  /** 緯度（-90〜90） */
  latitude: number
  /** 経度（-180〜180） */
  longitude: number
}

export const LocationValidator = joi.object<Location>().keys({
  id: joi.string().optional(),
  name: joi.string().required().max(250),
  latitude: joi.number().required().min(-90).max(90),
  longitude: joi.number().required().min(-180).max(180),
})
