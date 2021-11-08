import { TestError } from '../../../mocks/TestError'
import { ArgumentError, NegativeGuard } from '../../../../src'

describe('NegativeGuard', () => {
  const customMessage = 'Testing custom error message'

  let negativeGuard: NegativeGuard

  beforeEach(() => negativeGuard = new NegativeGuard())

  describe('#guard', () => {
    const property = -5

    it('returns the property when the property is not a negative number', () => {
      const property = '42'

      return negativeGuard.guard(property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is a negative number', () => {
      try {
        negativeGuard.guard(property, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is a negative number', () => {
      try {
        negativeGuard.guard(property)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be negative number')
      }
    })

    it('throws default `ArgumentError` when the property is not a number', () => {
      try {
        negativeGuard.guard('not a number')
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property must be a number')
      }
    })

    it('throws default `ArgumentError` with specified custom message when the property is a negative number', () => {
      try {
        negativeGuard.guard(property, customMessage)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal(customMessage)
      }
    })
  })
})
