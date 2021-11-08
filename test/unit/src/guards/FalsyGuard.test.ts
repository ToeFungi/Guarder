import { TestError } from '../../../mocks/TestError'
import { falsyValues } from '../../../mocks/FalsyValues'
import { ArgumentError, FalsyGuard } from '../../../../src'

describe('FalsyGuard', () => {
  const customMessage = 'Testing custom error message'

  let falsyGuard: FalsyGuard

  beforeEach(() => falsyGuard = new FalsyGuard())

  it('returns the value when the property is not falsy', () => {
    const property = 'foo'

    return falsyGuard.guard(property)
      .should.deep.equal(property)
  })

  falsyValues.forEach(falsyValue => {
    context(`Falsy value = ${falsyValue}`, () => {
      it(`throws given error when the property is ${falsyValue}`, () => {
        try {
          falsyGuard.guard(falsyValue, customMessage, TestError)
        } catch (error) {
          error.should.be.instanceOf(TestError)
          error.message.should.deep.equal(customMessage)
        }
      })

      it(`throws default \`ArgumentError\` when the property is ${falsyValue}`, () => {
        try {
          falsyGuard.guard(falsyValue)
        } catch (error) {
          error.should.be.instanceOf(ArgumentError)
          error.message.should.deep.equal('Property not allowed to be falsy')
        }
      })

      it(`throws default \`ArgumentError\` with specified custom message when the property is ${falsyValue}`, () => {
        try {
          falsyGuard.guard(falsyValue, customMessage)
        } catch (error) {
          error.should.be.instanceOf(ArgumentError)
          error.message.should.deep.equal(customMessage)
        }
      })
    })
  })
})
