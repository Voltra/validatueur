import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import { isValue } from "../utils";
import { RuleChain } from "../rules";

//TODO: Move to sanitizers

export class Nullable<T = unknown> extends AbstractValidator<T | null> {
	public get rule(): string {
		return "nullable";
	}

	public shouldValidate(value: T | null, args: Validatueur.ValidatorArgs, schema: Validatueur.Schema): boolean {
		return true; // always validate as it converts to null if it doesn't have any value
	}

	protected __validate(
		field: string,
		value: T | null,
		schema: Validatueur.Schema,
		rules: RuleChain<T>
	): Validatueur.Promise<T | null> {
		if (!isValue(value)) return Promise.resolve(null);

		return rules.__validate(field, value as T, schema);
	}
}
