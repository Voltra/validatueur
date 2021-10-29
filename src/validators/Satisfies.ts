import { AbstractValidator } from "./AbstractValidator";
import { noneIf } from "../api/types";
import { Validatueur } from "../api";

export class Satisfies<T = unknown> extends AbstractValidator<T> {
	public get rule() {
		return "satisfies" as const;
	}

	protected __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		value: T,
		schema: Validatueur.Schema<Keys, Values>,
		predicate: (value: T) => boolean
	): Validatueur.Promise<T> {
		return noneIf(!predicate(value), value);
	}
}
