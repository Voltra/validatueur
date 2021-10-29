import { Validatueur } from "../api";
import { AbstractValidator } from "./AbstractValidator";
import { isValue } from "../utils";

export class Required<T = unknown> extends AbstractValidator<T> {
	public get rule() {
		return "required" as const;
	}

	protected __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		value: T,
		schema: Validatueur.Schema<Keys, Values>
	): Validatueur.Promise<T> {
		return Validatueur.noneIf(!isValue(value), value);
	}

	public shouldValidate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		value: T,
		args: Validatueur.ValidatorArgs<Key>,
		schema: Validatueur.Schema<Keys, Values>
	): boolean {
		return true;
	}
}
