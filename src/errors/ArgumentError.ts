/**
 * Argument Error is thrown when an argument doesn't match given criteria
 */
class ArgumentError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
  }
}

export { ArgumentError }
