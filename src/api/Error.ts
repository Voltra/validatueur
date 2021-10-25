import { Optional } from "./types";

export interface Error<Key extends string = string> {
	field: Key;
	message: string;
	rule: Optional<string>;
}

export const isError = <Key extends string = string>(e: any): e is Error<Key> =>
	typeof e == "object" &&
	e &&
	["field", "message", "rule"].every(key => key in e);
