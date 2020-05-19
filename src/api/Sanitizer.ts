import { Optional } from "./types"

export interface Sanitizer<T, E = T>{
	sanitize(value: T): Optional<E>;
}