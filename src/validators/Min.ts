import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asNumber } from "../utils";

export class Min<T = number> extends AbstractValidator<T, number> {
	public get rule(): string {
		return "min";
	}
	protected __validate(
		value: T,
		min: number,
		exclusive: boolean = false
	): Validatueur.Optional<number> {
		const nb = asNumber(value);
		const validates = exclusive ? nb > min : nb >= min;
		if (validates) return nb;
	}
}
