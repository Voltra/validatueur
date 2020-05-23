import { Regex } from "./Regex";
import { Validatueur } from "../index";
import { RegularExpressions } from "../utils";

export class HasDigit<T = string> extends Regex<T> {
	public get rule() {
		return "hasDigit";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(
			field,
			value,
			schema,
			RegularExpressions.digit,
			false
		);
	}
}
