import { Optional } from "./types";

export interface Sanitizer<T, U = T> {
	sanitize(value: T): Optional<U>;
}
