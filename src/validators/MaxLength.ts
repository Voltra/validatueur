import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asStr } from "../utils";

export class MaxLength<T = string> extends AbstractValidator<T, string> {
	public get rule(): string {
		return "maxLength";
	}
	protected __validate(
		value: T,
		schema: Validatueur.Schema,
		max: number,
		exclusive: boolean = true
	): Validatueur.Optional<string> {
		const str = asStr(value);

		const validates = exclusive ? str.length < max : str.length <= max;

		if (validates) return str;
	}
}
