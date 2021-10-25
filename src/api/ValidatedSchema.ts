import { Error } from "./Error";
import { Values } from "./Values";

export interface ValidatedSchema<K extends string = string, V = unknown> {
	errors: Error<K>[];
	values: Values<K, V>;
	valid: boolean;
}
