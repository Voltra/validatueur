import { Regex } from "./Regex";
import { Validatueur } from "../index";

export class HasLowercaseLetter<T = string> extends Regex<T> {
	public get rule() {
		return "hasLowercaseLetter";
	}

	protected __validate(
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(value, schema, /[a-z]/, false);
	}
}
