import { Regex } from "./Regex";
import { Validatueur } from "../index";
import { RegularExpressions } from "../utils";

export class HasSpecialCharacter<T = string> extends Regex<T> {
	public get rule() {
		return "hasSpecialCharacter";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(
			value,
			schema,
			RegularExpressions.specialCharacter,
			false
		);
	}
}
