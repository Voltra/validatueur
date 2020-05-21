import { ValidatorWrapper } from "./Validator"
import { Error, isError } from "./Error"
import { ValidatedSchema } from "./ValidatedSchema"
import { asSequence } from "sequency"

export class Schema{
	public static from(
		ruleSet: Record<string, ValidatorWrapper<any>>,
		messages: Record<string, string>
	){
		return new this(ruleSet, messages);
	}

	protected constructor(
		protected ruleSet: Record<string, ValidatorWrapper<any>>,
		protected messages: Record<string, string>,
	){
	}

	public validate(values: Record<string, any>): ValidatedSchema{
		return asSequence(Object.entries(values))
		.map(([field, value]: [string, any]) => {
			if(!(field in this.ruleSet))
				return {
					field,
					result: value,
				};

			const wrapper = this.ruleSet[field];
			const { args } = wrapper;
			const message = field in this.messages ? this.messages[field] : "";

			const result = wrapper.validator().validate(value, {
				args,
				field,
				message,
			});

			return {
				field,
				result,
			};
		}).reduce((acc, { field, result }) => {
			if(isError(result))
				acc.errors.push(result as Error);
			else
				acc.values[field] = result as any;

			return acc;
		}, {
			errors: [],
			values: {},
		});
	}
}