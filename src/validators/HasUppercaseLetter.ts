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
	): Validatueur.Promise<string> {
		return super.__validate(
			field,
			value,
			schema,
			RegularExpressions.uppercaseLetter,
			false
		);
	}
}
