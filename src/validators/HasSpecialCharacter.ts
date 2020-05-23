import { Regex } from "./Regex";
import { Validatueur } from "../index";

export class HasSpecialCharacter<T = string> extends Regex<T> {
	public get rule() {
		return "hasSpecialCharacter";
	}

	protected __validate(
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Optional<string> {
		return super.__validate(
			value,
			schema,
			/[\.!\?\[\]\(\)\{\}\<\>\^\$€#@,;:\-_%&~"'\|`=]/,
			false
		);
	}
}
