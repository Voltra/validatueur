/**
 * A type that represents an empty value
 */
export declare type None = undefined;
export declare const none: undefined;
/**
 * A type that represents a value that might be there
 */
export declare type Optional<T> = T | None;
/**
 * A type that is either a value type or an error type
 */
export declare type Result<T, E> = T | E;
/**
 * A type that is either a value type or a value type with additional properties
 */
export declare type Extended<T> = T & {
    [key: string]: any;
};
export declare const isNone: <T>(opt: Optional<T>) => boolean;
export declare type ValidationPromise<T = any, E = any> = Promise<T>;
export declare const ValidationPromise: PromiseConstructor;
export declare const noneIf: <T>(condition: boolean, value: T) => ValidationPromise<T, undefined>;
