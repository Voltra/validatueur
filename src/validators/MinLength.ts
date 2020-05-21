import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asStr } from "../utils";

export class MinLength<T = string> extends AbstractValidator<T, string> {
	public get rule(): string {
		return "minLength";
	}

	protected __validate(value: T, min: number): Validatueur.Optional<string> {
		const str = asStr(value);
		if (str.length >= min) return str;
	}
}
