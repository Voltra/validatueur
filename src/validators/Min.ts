import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asNumber } from "../utils";

export class Min<T = number> extends AbstractValidator<T, number> {
	public get rule(): string {
		return "min";
	}
	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		min: number,
		exclusive: boolean = false
	): Validatueur.Promise<number> {
		const nb = asNumber(value);
		const validates = exclusive ? nb > min : nb >= min;

		return Validatueur.noneIf(!validates, nb);
	}
}
