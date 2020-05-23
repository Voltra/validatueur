import { Regex } from "./Regex";
import { Validatueur } from "../index";

export class HasDigit<T = string> extends Regex<T> {
	public get rule() {
		return "hasDigit";
	}

	protected __validate(
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(value, schema, /[0-9]/, false);
	}
}
