import { Instantiable } from './Instantiable'

/**
 * Guards represent specific validation mechanisms
 */
interface Guard {
  /**
   * Validate that the property passes pre-determined criteria or throw an error
   */
  guard<T = any>(property: T, errorMessage?: string, error?: Instantiable<Error>): T
}

export { Guard }
