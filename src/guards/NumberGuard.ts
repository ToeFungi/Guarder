import { Guarder } from '../Guarder'
import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Number Guard validates that the property is a number
 */
class NumberGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    Guarder.null(property)
    Guarder.empty(property)

    const isNumber = isNaN(parseInt(property.toString()))

    if (isNumber) {
      const message = errorMessage ?? 'Property must be a number'

      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { NumberGuard }
