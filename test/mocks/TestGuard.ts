import { Class } from '../../src/types/Class'
import { Guard } from '../../src/types/Guard'
import { ArgumentError } from '../../src/errors/ArgumentError'

class TestGuard implements Guard {
  public guard<T = string>(property: T, errorMessage?: string, error?: Class<Error>): T {
    const message = errorMessage ?? 'Property not allowed to be "foobar"'

    if (typeof property === 'string' && property === 'foobar') {
      if (error) {
        throw new error(message)
      }

      throw new ArgumentError(message)
    }

    return property
  }
}

export { TestGuard }
