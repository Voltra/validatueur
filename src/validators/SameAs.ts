import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";

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
