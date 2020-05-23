import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
import { Validatueur } from "../api/index";
import { isError } from "../api/Error";

export class SameAs<T = any> extends AbstractValidator<T, any> {
	public get rule(): string {
		return "sameAs";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Schema,
		otherField: string
	) {
		return schema.__validateField(otherField, value);
	}
}
