import { Regex } from "./Regex";
import { Validatueur } from "../index";

export class HasUppercaseLetter<T = string> extends Regex<T> {
	public get rule() {
		return "uppercaseLetter";
	}

	protected __validate(
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(value, schema, /[A-Z]/, false);
	}
}
