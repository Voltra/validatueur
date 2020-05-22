import { Error, isError } from "./Error";
import { ValidatedSchema } from "./ValidatedSchema";
import { RuleChain } from "../rules";
import { asSequence } from "sequency";

export interface SchemaArgs {
	rules: Record<string, RuleChain>;
	messages: Record<string, string>;
}

export class Schema {
	public static from({ rules, messages }: SchemaArgs) {
		return new this(rules, messages);
	}

	protected constructor(
		protected ruleSet: Record<string, RuleChain>,
		protected messages: Record<string, string>
	) {}

	public validate(values: Record<string, any>): ValidatedSchema {
		return (<any>asSequence(Object.entries(values)))
			.map(([field, value]: [string, any]) => {
				if (!(field in this.ruleSet))
					return {
						field,
						result: value,
					};

				const chain = this.ruleSet[field];
				const result = chain.validate(field, value, this.messages);

				return {
					field,
					result,
				};
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
