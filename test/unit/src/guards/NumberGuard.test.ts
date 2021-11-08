import { TestError } from '../../../mocks/TestError'
import { ArgumentError, NumberGuard } from '../../../../src'

describe('NumberGuard', () => {
  const customMessage = 'Testing custom error message'

  let numberGuard: NumberGuard

  beforeEach(() => numberGuard = new NumberGuard())

  describe('#guard', () => {
    const property = 'not a number'

    it('returns the property when the property is a number', () => {
      const property = 42

      return numberGuard.guard(property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is not a number', () => {
      try {
        numberGuard.guard(property, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is not a number', () => {
      try {
        numberGuard.guard(property)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property must be a number')
      }
    })

    it('throws default `ArgumentError` with specified custom message when the property is not a number', () => {
      try {
        numberGuard.guard(property, customMessage)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal(customMessage)
      }
    })
  })
})
