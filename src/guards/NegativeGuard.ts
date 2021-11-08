import { Guarder } from '../Guarder'
import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Negative Guard validates a property is not a negative number
 */
class NegativeGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const int = parseInt(Guarder.empty(property).toString())

    if (isNaN(int)) {
      this.throwError(errorMessage ?? 'Property must be a number', error)
    }

    if (isNaN(int) || int < 0) {
      this.throwError(errorMessage ?? 'Property not allowed to be negative number', error)
    }

    return property
  }

  private throwError(message: string, error?: Instantiable<Error>): never {
    if (error) {
      throw new error(message)
    }

    throw new ArgumentError(message)
  }
}

export { NegativeGuard }
