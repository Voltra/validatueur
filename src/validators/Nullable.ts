import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import { isValue } from "../utils";
import { RuleChain } from "../rules";

//TODO: Move to sanitizers

export class Nullable<T = any> extends AbstractValidator<T | null> {
	public get rule(): string {
		return "nullable";
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
