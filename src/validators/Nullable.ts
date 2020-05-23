import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { isValue } from "../utils";

export class Nullable<T = any> extends AbstractValidator<T | null> {
	public get rule(): string {
		return "nullable";
	}

	protected __validate(
		field: string,
		value: T | null,
		schema: Validatueur.Schema
	): Validatueur.Optional<T | null> {
		if (!isValue(value)) return null;

		return value;
	}
}
