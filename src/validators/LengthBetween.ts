import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asStr } from "../utils";

export class LengthBetween<T = string> extends AbstractValidator<T, string> {
	public get rule(): string {
		return "lengthBetween";
	}
	protected __validate(
		value: T,
		min: number,
		max: number,
		endExclusive: boolean = true,
		beginExclusive: boolean = false
	): Validatueur.Optional<string> {
		const str = asStr(value);

		const validatesMin = beginExclusive
			? min < str.length
			: min <= str.length;

		const validatesMax = endExclusive
			? str.length < max
			: str.length <= max;

		if (validatesMin && validatesMax) return str;
	}
}
