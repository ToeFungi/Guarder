import { Guarder } from '../Guarder'
import { Guard } from '../types/Guard'
import { Instantiable } from '../types/Instantiable'
import { ArgumentError } from '../errors/ArgumentError'

/**
 * Whitespace Guard validates that the string does not contain only whitespace
 */
class WhitespaceGuard implements Guard {
  /**
   * @inheritDoc
   */
  public guard<T = unknown>(property: T, errorMessage?: string, error?: Instantiable<Error>): T {
    const parsedProperty = Guarder.empty(property)
      .toString()

    const isEmptyString = typeof parsedProperty === 'string' ? parsedProperty.trim()
      .length === 0 : false

    if (isEmptyString) {
      const message = errorMessage ?? 'Property is not allowed to contain only whitespace'

      if (error) throw new error(message)
      throw new ArgumentError(message)
    }

    return property
  }
}

export { WhitespaceGuard }
