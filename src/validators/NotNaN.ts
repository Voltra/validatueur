import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import { asNumber, Sanitizers } from "../utils";

//TODO: Move to sanitizers

export class NotNaN extends AbstractValidator<number> {
	public get rule() {
		return "notNaN" as const;
	}
	protected __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		value: number,
		schema: Validatueur.Schema<Keys, Values>,
		...args: unknown[]
	): Validatueur.Promise<number> {
		const nb = asNumber(value);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	}
}
