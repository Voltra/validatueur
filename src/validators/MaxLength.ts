import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asStr } from "../utils";

export class MaxLength<T = string> extends AbstractValidator<T, string> {
	public get rule(): string {
		return "maxLength";
	}
	protected __validate(value: T, max: number): Validatueur.Optional<string> {
		const str = asStr(value);

		if (str.length < max) return str;
	}
}
