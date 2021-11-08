import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Null Guard ensures that the property is not null
 */
class NullGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = any>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const message = errorMessage ?? 'Property not allowed to be null'

    if (property === null) {
      if (error) {
        throw new error(message)
      }

      throw new ArgumentError(message)
    }

    return property
  }
}

export { NullGuard }
