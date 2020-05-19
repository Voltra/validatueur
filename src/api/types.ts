export type None = null | undefined;

export type Optional<T> = T | None;

export type Result<T, E> = T | E;