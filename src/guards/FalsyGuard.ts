import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Falsy Guard ensures that the property does not evaluate to false in a type coercion
 */
class FalsyGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const message = errorMessage ?? 'Property not allowed to be falsy'

    if (!(!!property)) {
      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { FalsyGuard }
