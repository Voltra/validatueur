import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asNumber } from "../utils";

export class Between<T = number> extends AbstractValidator<T, number> {
	public get rule(): string {
		return "between";
	}

	protected __validate(
		value: T,
		min: number,
		max: number,
		endExclusive: boolean = true,
		beginExclusive: boolean = false
	): Validatueur.Optional<number> {
		const nb = asNumber(value);

		const validatesMin = beginExclusive ? min < nb : min <= nb;

		const validatesMax = endExclusive ? nb < max : nb <= max;

		if (validatesMin && validatesMax) return nb;
	}
}
