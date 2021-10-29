import { AbstractValidator } from "./index";
import { Validatueur } from "../api";
import { RuleChain } from "../rules";

export class ArrayOf<T = unknown> extends AbstractValidator<T[]> {
	public get rule() {
		return "arrayOf" as const;
	}

	protected async __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		values: T[],
		schema: Validatueur.Schema<Keys, Values>,
		rules: RuleChain<T>
	): Validatueur.Promise<T[]> {
		const ret: T[] = [];

		// validate values "SEQUENTIALLY"
		for (const value of values) {
			const newValue = await rules.__validate<Keys, Key, Values>(field, value, schema);
			ret.push(newValue);
		}

		return ret;
	}
}
