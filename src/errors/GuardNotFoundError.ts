/**
 * Guard Not Found Error is thrown when a custom guard cannot be found in the map
 */
class GuardNotFoundError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export { GuardNotFoundError }
