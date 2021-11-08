import { Guarder } from '../Guarder'
import { Guard } from '../types/Guard'
import { NumberGuard } from './NumberGuard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Zero Guard validates that the property is not zero
 */
class ZeroGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    Guarder.guard(NumberGuard, property, errorMessage, error)

    const number = parseInt(property.toString())

    if (number === 0) {
      const message = errorMessage ?? 'Property not allowed to be zero'

      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { ZeroGuard }
