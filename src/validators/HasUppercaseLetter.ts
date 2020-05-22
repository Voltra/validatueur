import { Regex } from "./Regex";
import { Validatueur } from "../index";

export class HasUppercaseLetter<T = string> extends Regex<T> {
	public get rule() {
		return "uppercaseLetter";
	}

	protected __validate(value: T): Validatueur.Optional<string> {
		return super.__validate(value, /[A-Z]/, false);
	}
}
