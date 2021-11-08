import { TestError } from '../../../mocks/TestError'
import { ArgumentError, UndefinedGuard } from '../../../../src'

describe('UndefinedGuard', () => {
  const customMessage = 'Testing custom error message'

  let undefinedGuard: UndefinedGuard

  beforeEach(() => undefinedGuard = new UndefinedGuard())

  describe('#guard', () => {
    it('returns the value when the property is not undefined', () => {
      const property = 'foo'

      return undefinedGuard.guard(property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is undefined', () => {
      try {
        undefinedGuard.guard(undefined, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is undefined', () => {
      try {
        undefinedGuard.guard(undefined)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be undefined')
      }
    })

    it('throws default `ArgumentError` with specified custom message when the property is undefined', () => {
      try {
        undefinedGuard.guard(undefined, customMessage)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal(customMessage)
      }
    })
  })
})
