/* eslint-disable @typescript-eslint/require-await */
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb'
import { ddb } from '../dynamo.js'
import { BaseDynamoRepository } from './base-dynamodb-repository.js'
import { User } from '@trip-check/types'
import { fromISOToDate } from '@trip-check/utils'

/**
 * Implementation for IUserRepository using DynamoDB as the data source.
 * @param ddbDocumentClient Instance for DynamoDBDocumentClient.
 * @returns An instance of the derived repository class tßo handle entity.
 * @see BaseDynamoRepository
 * @see IUserRepository
 * @see User
 */

export class UserRepository extends BaseDynamoRepository<User> {
  constructor(ddbDocumentClient: DynamoDBDocumentClient = ddb) {
    super(ddbDocumentClient, 'user')
  }

  protected override mapEntity(record: Record<string, unknown>): User {
    record.birthday = fromISOToDate(record.birthday as string)
    return record as User
  }

  protected override handleModel(entity: User): User {
    const model = entity as Record<string, unknown>
    model.gsi1pk = `${entity.id}`
    return entity
  }
}
