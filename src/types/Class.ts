/**
 * Type allowing the passing of an uninstantiated Class as a property
 */
type Class<T> = new (...args: any[]) => T;

export { Class }
