import { AbstractValidator } from "./AbstractValidator";
import { noneIf } from "../api/types";
import { Validatueur } from "../api";

export class Satisfies<T = any> extends AbstractValidator<T> {
	public get rule(): string {
		return "satisfies";
	}
	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		predicate: (value: T) => boolean
	): Validatueur.Promise<T> {
		return noneIf(!predicate(value), value);
	}
}
