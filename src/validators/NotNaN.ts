import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import { asNumber, Sanitizers } from "../utils";

//TODO: Move to sanitizers

export class NotNaN<T = number> extends AbstractValidator<T, number> {
	public get rule(): string {
		return "notNaN";
	}
	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		...args: unknown[]
	): Validatueur.Promise<number> {
		const nb = asNumber(value);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	}
}
