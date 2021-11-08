import { TestError } from '../../../mocks/TestError'
import { ArgumentError, EmptyGuard } from '../../../../src'

describe('EmptyGuard', () => {
  const customMessage = 'Testing custom error message'

  let emptyGuard: EmptyGuard

  beforeEach(() => emptyGuard = new EmptyGuard())

  describe('#guard', () => {
    it('returns the object when the object is not empty', () => {
      const data = {
        foo: 'bar'
      }

      return emptyGuard.guard(data)
        .should.deep.equal(data)
    })

    it('returns the array when the array is not empty', () => {
      const data = [
        'foo'
      ]

      return emptyGuard.guard(data)
        .should.deep.equal(data)
    })

    it('returns the string when the string is not empty', () => {
      const data = 'foo'

      return emptyGuard.guard(data)
        .should.deep.equal(data)
    })

    it('throws given error when the property is null', () => {
      try {
        emptyGuard.guard('', customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is null', () => {
      try {
        emptyGuard.guard(null)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be empty')
      }
    })

    it('throws default `ArgumentError` when the property is undefined', () => {
      try {
        emptyGuard.guard(undefined)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be empty')
      }
    })

    it('throws default `ArgumentError` when the property is an empty string', () => {
      try {
        emptyGuard.guard('')
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be empty')
      }
    })

    it('throws default `ArgumentError` when the property is an empty array', () => {
      try {
        emptyGuard.guard([])
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be empty')
      }
    })

    it('throws default `ArgumentError` when the property is an empty object', () => {
      try {
        emptyGuard.guard({})
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be empty')
      }
    })
  })
})
