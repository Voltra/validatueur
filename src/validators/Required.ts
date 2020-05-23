import { Validatueur } from "../api/index";
import { AbstractValidator } from "./AbstractValidator";
import { isValue } from "../utils";

export class Required<T = any> extends AbstractValidator<T> {
	public get rule(): string {
		return "required";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Promise<T> {
		return Validatueur.noneIf(!isValue(value), value);
	}
}
