import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
import { Validatueur } from "../api/index";
import { isError } from "../api/Error";

//TODO: Maybe refactor __validate interface to return result and take the field name (would allow error impersonation)

export class SameAs<T = any> extends AbstractValidator<T, any>{
	public get rule(): string {
		return "sameAs";
	}

	protected __validate(value: T, schema: Schema, otherField: string) {
		const { result } = schema.__validateField(otherField, value);
		if(!isError(result))
			return result as any;
	}
}