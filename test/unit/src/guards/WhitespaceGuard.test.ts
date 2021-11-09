import { TestError } from '../../../mocks/TestError'
import { ArgumentError, WhitespaceGuard } from '../../../../src'

describe('WhitespaceGuard', () => {
  const customMessage = 'Testing custom error message'

  let whitespaceGuard: WhitespaceGuard

  beforeEach(() => whitespaceGuard = new WhitespaceGuard())

  describe('#guard', () => {
    const property = 'test'

    it('returns the property when the string is not whitespace', () => {
      return whitespaceGuard.guard(property)
        .should.deep.equal(property)
    })

    it('returns the property when the string is not whitespace', () => {
      const property = ['asd']

      return whitespaceGuard.guard(property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is only whitespace', () => {
      try {
        whitespaceGuard.guard(' ', customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is only whitespace', () => {
      try {
        whitespaceGuard.guard(' ')
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property is not allowed to contain only whitespace')
      }
    })

    it('throws default `ArgumentError` with specified custom message when the property is only whitespace', () => {
      try {
        whitespaceGuard.guard(' ', customMessage)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal(customMessage)
      }
    })
  })
})
