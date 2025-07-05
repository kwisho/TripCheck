import { Location, TransportType } from '@trip-check/types'

export class CalculateRouteCommand {
  constructor(
    public readonly fromLocation: Location,
    public readonly toLocation: Location,
    public readonly transportType: TransportType,
    public readonly departureTime: Date,
  ) {}
}
