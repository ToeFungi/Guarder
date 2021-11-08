import { Guard } from './types/Guard'
import { NullGuard } from './guards/NullGuard'
import { EmptyGuard } from './guards/EmptyGuard'
import { FalsyGuard } from './guards/FalsyGuard'
import { Instantiable } from './types/Instantiable'
import { UndefinedGuard } from './guards/UndefinedGuard'
import { GuardNotFoundError } from './errors/GuardNotFoundError'

/**
 * Guarder provides various guards which can be used for quick validation of data
 */
class Guarder {
  /**
   * Default built-in guards
   */
  private static guards: Map<string, Guard> = new Map<string, Guard>()
    .set('empty', new EmptyGuard())
    .set('null', new NullGuard())
    .set('undefined', new UndefinedGuard())
    .set('falsy', new FalsyGuard())

  /**
   * Returns the property if the property is not null. Throws an error if the property is null.
   */
  public static null<T = unknown>(property: T, message?: string, error?: Instantiable<Error>): T {
    const emptyGuard = this.guards.get('null')
    return emptyGuard.guard(property, message, error)
  }

  /**
   * Returns the property if the property is not undefined. Throws an error if the property is undefined.
   */
  public static undefined<T = unknown>(property: T, message?: string, error?: Instantiable<Error>): T {
    const emptyGuard = this.guards.get('undefined')
    return emptyGuard.guard(property, message, error)
  }

  /**
   * Returns the property if the property is not an empty string, object, array, undefined or null. Throws an error if
   * the criteria is not met.
   */
  public static empty<T = unknown>(property: T, message?: string, error?: Instantiable<Error>): T {
    const emptyGuard = this.guards.get('empty')
    return emptyGuard.guard(property, message, error)
  }

  /**
   * Returns the property if the property does not evaluate to false in a type coercion
   */
  public static falsy<T = unknown>(property: T, message?: string, error?: Instantiable<Error>): T {
    const falsyGuard = this.guards.get('falsy')
    return falsyGuard.guard(property, message, error)
  }

  /**
   * Returns the property if the property passes the custom guards validation logic and will throw an Argument Error or
   * custom error if specified
   */
  public static custom<T = unknown>(guardName: string, property: T, message?: string, error?: Instantiable<Error>): T {
    const customGuard = this.guards.get(guardName)

    if (!customGuard) {
      throw new GuardNotFoundError(`Custom guard '${guardName}' not found in registered guards`)
    }

    return customGuard.guard(property, message, error)
  }

  /**
   * Returns the property if the property passes the custom guards validation logic and will throw an Argument Error or
   * custom error if specified
   */
  public static guard<T = unknown>(guard: Instantiable<Guard>, property: T, message?: string, error?: Instantiable<Error>): T {
    const customGuard = new guard()
    return customGuard.guard(property, message, error)
  }

  /**
   * Get all registered guards
   */
  public static getRegisteredGuards(): string[] {
    return [
      ...this.guards.keys()
    ]
  }

  /**
   * Remove a guard from the guard map
   */
  public static unregisterGuard(guardName: string): void {
    if (this.guards.get(guardName)) {
      this.guards.delete(guardName)
    }
  }

  /**
   * Register custom unique guard in the guard map
   */
  public static registerGuard(guardName: string, guard: Instantiable<Guard>): void {
    if (!this.guards.get(guardName)) {
      this.guards.set(guardName, new guard())
    }
  }
}

export { Guarder }
