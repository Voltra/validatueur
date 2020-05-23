import { Regex } from "./Regex";
import { Validatueur } from "../index";
import { RegularExpressions } from "../utils";

export class HasLowercaseLetter<T = string> extends Regex<T> {
	public get rule() {
		return "hasLowercaseLetter";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(
			value,
			schema,
			RegularExpressions.lowercaseLetter,
			false
		);
	}
}
