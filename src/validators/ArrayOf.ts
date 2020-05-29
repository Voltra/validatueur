import { AbstractValidator } from "./index";
import { Validatueur } from "../api";
import { RuleChain } from "../rules";

export class ArrayOf<T = any> extends AbstractValidator<any[], T[]> {
	public get rule(): string {
		return "arrayOf";
	}

	protected async __validate(
		field: string,
		values: any[],
		schema: Validatueur.Schema,
		rules: RuleChain<T>
	): Validatueur.Promise<T[]> {
		const ret: T[] = [];

		for (const value of values) {
			const newValue = await rules.__validate(field, value, schema);
			ret.push(newValue);
		}

		return ret;
	}
}
