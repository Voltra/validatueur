/**
 * A type that represents an empty value
 */
export type None = /* null | */ undefined;

/**
 * A type that represents a value that might be there
 */
export type Optional<T> = T | None;

/**
 * A type that is either a value type or an error type
 */
export type Result<T, E> = T | E;

/**
 * A type that is either a value type or a value type with additional properties
 */
export type Extended<T> = T | (T & { [key: string]: any });

export const isNone = <T>(opt: Optional<T>) => {
	return /* opt === null || */ opt === undefined;
};
