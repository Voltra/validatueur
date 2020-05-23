import { Regex } from "./Regex";
import { Validatueur } from "../index";
import { RegularExpressions } from "../utils";

export class HasUppercaseLetter<T = string> extends Regex<T> {
	public get rule() {
		return "uppercaseLetter";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(
			value,
			schema,
			RegularExpressions.uppercaseLetter,
			false
		);
	}
}
