import { Error, isError } from "./Error";
import { ValidatedSchema } from "./ValidatedSchema";
import { RuleChain } from "../rules";
import { asSequence } from "sequency";
import { Validatueur } from "./index";

export interface SchemaArgs {
	rules: Record<string, RuleChain>;
	messages: Record<string, string>;
}

export interface SchemaFieldValidationResult<T = any, U = T>{
	field: string,
	result: Validatueur.Result<U, Validatueur.Error>,
}

export class Schema {
	public static from({ rules, messages }: SchemaArgs) {
		return new this(rules, messages);
	}

	protected constructor(
		public readonly ruleSet: Record<string, RuleChain>,
		public readonly messages: Record<string, string>
	) {}

	public __validateField(field: string, value: any): SchemaFieldValidationResult{
		if (!(field in this.ruleSet))
			return {
				field,
				result: value,
			};

		const result = this.ruleSet[field].__validate(field, value, this);

		return {
			field,
			result
		};
	}

	public validate(values: Record<string, any>): ValidatedSchema {
		return (<any>asSequence(Object.entries(values)))
			.map(([field, value]: [string, any]) => {
				return this.__validateField(field, value);
			})
			.reduce(
				(acc: ValidatedSchema, { field, result }) => {
					if (isError(result)) acc.errors.push(result as Error);
					else acc.values[field] = result as any;

					return acc;
				},
				{
					errors: [],
					values: {},
				}
			);
	}
}
