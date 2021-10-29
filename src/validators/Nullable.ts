import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import { isValue } from "../utils";
import { RuleChain } from "../rules";

//TODO: Move to sanitizers

export class Nullable<T = unknown> extends AbstractValidator<T | null> {
	public get rule() {
		return "nullable" as const;
	}

	public shouldValidate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		value: T | null,
		args: Validatueur.ValidatorArgs<Key>,
		schema: Validatueur.Schema<Keys, Values>
	): boolean {
		return true; // always validate as it converts to null if it doesn't have any value
	}

	protected __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		value: T | null,
		schema: Validatueur.Schema<Keys, Values>,
		rules: RuleChain<T>
	): Validatueur.Promise<T | null> {
		if (!isValue(value)) return Promise.resolve(null);

		return rules.__validate(field, value as T, schema);
	}
}
