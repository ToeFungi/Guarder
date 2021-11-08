import { TestError } from '../../../mocks/TestError'
import { ArgumentError, ZeroGuard } from '../../../../src'

describe('ZeroGuard', () => {
  const customMessage = 'Testing custom error message'

  let zeroGuard: ZeroGuard

  beforeEach(() => zeroGuard = new ZeroGuard())

  describe('#guard', () => {
    const property = 0

    it('returns the property when the property is a positive number greater than zero', () => {
      const property = 42

      return zeroGuard.guard(property)
        .should.deep.equal(property)
    })

    it('returns the property when the property is a negative number zero', () => {
      const property = -42

      return zeroGuard.guard(property)
        .should.deep.equal(property)
    })

    it('throws default `ArgumentError` when the property is not a number', () => {
      const property = 'not a number'

      try {
        zeroGuard.guard(property)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property must be a number')
      }
    })

    it('throws given error when the property is zero', () => {
      try {
        zeroGuard.guard(property, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is zero', () => {
      try {
        zeroGuard.guard(property)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be zero')
      }
    })

    it('throws default `ArgumentError` with specified custom message when the property is zero', () => {
      try {
        zeroGuard.guard(property, customMessage)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal(customMessage)
      }
    })
  })
})
