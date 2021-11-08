import { EmptyGuard } from '../../../lib'
import { TestError } from '../../mocks/TestError'
import { TestGuard } from '../../mocks/TestGuard'
import { CustomGuards } from '../../mocks/CustomGuards'
import { ArgumentError, Guarder, GuardNotFoundError } from '../../../src'

describe('Guarder', () => {
  const customMessage = 'Testing custom error message'

  describe('#null', () => {
    it('returns the value when the property is not null', () => {
      const property = 'foo'

      return Guarder.null(property)
        .should.deep.equal(property)
    })
  })

  describe('#undefined', () => {
    it('returns the value when the property is not undefined', () => {
      const property = 'foo'

      return Guarder.undefined(property)
        .should.deep.equal(property)
    })
  })

  describe('#empty', () => {
    it('returns the value when the property is not empty', () => {
      const property = 'foo'

      return Guarder.empty(property)
        .should.deep.equal(property)
    })
  })

  describe('#getRegisteredGuards', () => {
    it('returns the list of pre-registered guards', () => {
      return Guarder.getRegisteredGuards()
        .should.deep.equal(['empty', 'null', 'undefined'])
    })
  })

  describe('#custom', () => {
    const property = 'foobar'

    before(() => Guarder.registerGuard(CustomGuards.TEST_GUARD, TestGuard))

    after(() => Guarder.unregisterGuard(CustomGuards.TEST_GUARD))

    it('returns the value when the property does not match "foobar"', () => {
      const property = 'barfoo'

      return Guarder.custom(CustomGuards.TEST_GUARD, property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is "foobar"', () => {
      try {
        Guarder.custom(CustomGuards.TEST_GUARD, property, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is "foobar"', () => {
      try {
        Guarder.custom(CustomGuards.TEST_GUARD, property)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be "foobar"')
      }
    })

    it('throws `GuardNotFoundError` when the specified custom guard is not registered', () => {
      const guardName = 'unregistered-guard'

      try {
        Guarder.custom(guardName, property)
      } catch (error) {
        error.should.be.instanceOf(GuardNotFoundError)
        error.message.should.deep.equal(`Custom guard '${guardName}' not found in registered guards`)
      }
    })
  })

  describe('#inlineCustom', () => {
    const property = 'foobar'

    it('returns the value when the property does not match "foobar"', () => {
      const property = 'barfoo'

      return Guarder.inlineCustom(TestGuard, property)
        .should.deep.equal(property)
    })

    it('throws given error when the property is "foobar"', () => {
      try {
        Guarder.inlineCustom(TestGuard, property, customMessage, TestError)
      } catch (error) {
        error.should.be.instanceOf(TestError)
        error.message.should.deep.equal(customMessage)
      }
    })

    it('throws default `ArgumentError` when the property is "foobar"', () => {
      try {
        Guarder.inlineCustom(TestGuard, property)
      } catch (error) {
        error.should.be.instanceOf(ArgumentError)
        error.message.should.deep.equal('Property not allowed to be "foobar"')
      }
    })
  })

  describe('#registerGuard', () => {
    const guardName = 'test-guard'

    afterEach(() => Guarder.unregisterGuard(guardName))

    it('registers the custom guard in the guard map', () => {
      Guarder.registerGuard(guardName, TestGuard)
      return Guarder.getRegisteredGuards()
        .should.include(guardName)
    })

    it('does not register a custom guard if the name already exists in the guard map', () => {
      const guardName = 'empty'

      Guarder.registerGuard(guardName, TestGuard)
      return Guarder.getRegisteredGuards()
        .should.deep.equal(['empty', 'null', 'undefined'])
    })
  })

  describe('#unregisterGuard', () => {
    afterEach(() => Guarder.registerGuard('empty', EmptyGuard))

    it('unregister the specified guard in the guard map', () => {
      const guardName = 'empty'

      Guarder.getRegisteredGuards()
        .should.include(guardName)

      Guarder.unregisterGuard(guardName)

      return Guarder.getRegisteredGuards()
        .should.not.include(guardName)
    })

    it('does not unregister a custom guard if the guard is not in the guard map', () => {
      const guardName = 'test-guard'

      Guarder.unregisterGuard(guardName)
      return Guarder.getRegisteredGuards()
        .should.deep.equal(['null', 'undefined', 'empty'])
    })
  })
})
