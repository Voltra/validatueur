import { ValidatorWrapper } from "./Validator";
import { Error, isError } from "./Error";
import { ValidatedSchema } from "./ValidatedSchema";
import { asSequence } from "sequency";

export interface SchemaArgs{
	rules: Record<string, ValidatorWrapper<any>>,
	messages: Record<string, string>,
}

export class Schema {
	public static from({
		rules,
		messages
	}: SchemaArgs) {
		return new this(rules, messages);
	}

	protected constructor(
		protected ruleSet: Record<string, ValidatorWrapper<any>>,
		protected messages: Record<string, string>
	) {}

	public validate(values: Record<string, any>): ValidatedSchema {
		return asSequence(Object.entries(values))
			.map(([field, value]: [string, any]) => {
				if (!(field in this.ruleSet))
					return {
						field,
						result: value,
					};

				const wrapper = this.ruleSet[field];
				const { args, name } = wrapper;
				const messageField = `${field}.${name}`;
				const message =
					messageField in this.messages
						? this.messages[messageField]
						: "";

				const result = wrapper.validator().validate(value, {
					args,
					field,
					message,
				});

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
