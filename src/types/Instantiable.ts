/**
 * Type representing an instantiable object
 */
type Instantiable<T> = new (...args: any[]) => T;

export { Instantiable }
