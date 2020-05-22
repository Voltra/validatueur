import { Regex } from "./Regex";
import { Validatueur } from "../index";

export class HasLowercaseLetter<T = string> extends Regex<T> {
	public get rule() {
		return "hasLowercaseLetter";
	}

	protected __validate(value: T): Validatueur.Optional<string> {
		return super.__validate(value, /[a-z]/, false);
	}
}
