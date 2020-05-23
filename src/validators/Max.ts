import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asNumber } from "../utils";

export class Max<T = number> extends AbstractValidator<T, number> {
	public get rule(): string {
		return "max";
	}
	protected __validate(
		value: T,
		schema: Validatueur.Schema,
		max: number,
		exclusive: boolean = true
	): Validatueur.Optional<number> {
		const nb = asNumber(value);
		const validates = exclusive ? nb < max : nb <= max;

		if (validates) return nb;
	}
}
