import { TestError } from '../../../mocks/TestError'
import { ArgumentError, NullGuard } from '../../../../src'

describe('NullGuard', () => {
  const customMessage = 'Testing custom error message'

  let nullGuard: NullGuard

  beforeEach(() => nullGuard = new NullGuard())

  describe('#guard', () => {
    it('returns the value when the property is not null', () => {
      const property = 'foo'

      return nullGuard.guard(property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is null', () => {
      try {
        nullGuard.guard(null, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is null', () => {
      try {
        nullGuard.guard(null)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be null')
      }
    })

    it('throws default `ArgumentError` with specified custom message when the property is null', () => {
      try {
        nullGuard.guard(null, customMessage)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal(customMessage)
      }
    })
  })
})
