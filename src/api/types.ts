/**
 * A type that represents an empty value
 */
export type None = /* null | */ undefined;

export const none = undefined;

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
export type Extended<T> = T & { [key: string]: any };

export const isNone = <T>(opt: Optional<T>) => {
	return opt === none;
};

export const noneIf = <T>(condition: (t: T) => boolean, value: T): Optional<T> => {
	return condition(value) ? none : value;
};
