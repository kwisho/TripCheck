import joi from 'joi'
import { BaseEntity } from './base'
import { Location } from './location'

export type TransportType = 'DRIVING' | 'WALKING' | 'BICYCLING' | 'TRANSIT';

export type RouteSegment = BaseEntity & {
  /** 対象の旅程プランID */
  planItemId: string
  /** 出発地の場所ID */
  fromLocationId: string
  /** 到着地の場所ID */
  toLocationId: string
  /** 移動手段（車、電車、徒歩、タクシーなど） */
  transportType: TransportType
  /** 移動にかかる時間（分単位） */
  durationMinutes: number
  /** 移動にかかる料金（円など） */
  cost: number
  /** 出発予定時刻（任意） */
  departureTime?: Date
  /** 到着予定時刻（任意、計算結果として利用） */
  arrivalTime?: Date
  /** リレーション先 */
  fromLocation?: Location;
  toLocation?: Location;
}

export const RouteSegmentValidator = joi.object<RouteSegment>().keys({
  id: joi.string().optional(),
  planItemId: joi.string().required(),
  fromLocationId: joi.string().required(),
  toLocationId: joi.string().required(),
  transportType: joi.string().valid('car', 'train', 'walk', 'taxi', 'bike').required(),
  durationMinutes: joi.number().integer().min(0).required(),
  cost: joi.number().min(0).required(),
  departureTime: joi.date().optional(),
  arrivalTime: joi.date().optional(),
})

