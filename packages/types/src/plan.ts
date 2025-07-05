import joi from 'joi'
import { BaseEntity } from './base'
import { PlanItem } from './plan-item'
import { RouteSegment } from './route-segment'
import { Tag } from './tag'
import { Location } from './location'

export type Plan = BaseEntity & {
  name: string
  startDate: Date
  endDate: Date
  description?: string
  userId: string,
  advisability: boolean,
  imageUrl?: string
}

export type FullPlan = Plan & {
  planItems: (PlanItem & {
    location: Location;
    routeSegments: (RouteSegment & {
      fromLocation?: Location;
      toLocation?: Location;
    })[];
  })[];
  tags: Tag[];
};


export const PlanValidator = joi.object<Plan>().keys({
  id: joi.string().optional(),
  name: joi.string().required().min(3).max(250),
  startDate: joi.date().required(),
  endDate: joi.date().required().min(joi.ref('startDate')),
  description: joi.string().max(1000).optional(),
  userId: joi.string().required(),
  advisability: joi.boolean().required(),
  imageUrl: joi.string().uri().max(1000).optional(),
})

