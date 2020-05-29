import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";

export class SameAs<T = any> extends AbstractValidator<T, any> {
	public get rule(): string {
		return "sameAs";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		otherField: string
	) {
		//TODO: Assert same value
		return schema.__validateField(otherField, value);
	}
}
