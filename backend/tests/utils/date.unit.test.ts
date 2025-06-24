import { describe, it } from 'node:test'
import { isDate } from '../../src/utils/date.js'
import assert from 'node:assert'

describe('date', () => {
  it('Should validate a valid date', () => {
    // arrange
    const data = '2024-03-12'

    // act
    const result = isDate(data)

    // assert
    assert.equal(result, true, 'The instance of the result is not valid.')
  })

  it('Should validate an invalid date', () => {
    // arrange
    const data = '2024-03-120'

    // act
    const result = isDate(data)

    // assert
    assert.equal(result, false, 'The instance of the result is not valid.')
  })
})
