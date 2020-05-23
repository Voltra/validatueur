import { Error, isError } from "./Error";
import { ValidatedSchema } from "./ValidatedSchema";
import { RuleChain } from "../rules";
import { asSequence } from "sequency";
import { Validatueur } from "./index";
import { Messages } from "./Messages";

export interface SchemaArgs {
	rules: Record<string, RuleChain>;
	messages: Messages;
}

export interface SchemaFieldValidationResult<T = any, U = T> {
	field: string;
	result: Validatueur.Result<U, Validatueur.Error>;
}

export class Schema {
	public static from({
		rules = {},
		messages = {},
	}: Partial<SchemaArgs> = {}) {
		return new this(rules, messages);
	}

	protected constructor(
		public readonly ruleSet: Record<string, RuleChain>,
		public readonly messages: Messages
	) {}

	public async __validateField(
		field: string,
		value: any
	): Promise<SchemaFieldValidationResult> {
		if (!(field in this.ruleSet))
			return {
				field,
				result: value,
			};

		const result = await this.ruleSet[field].__validate(field, value, this);

		return {
			field,
			result,
		};
	}

	public async validate(
		values: Record<string, any>
	): Validatueur.Promise<ValidatedSchema> {
		const ret: ValidatedSchema = {
			errors: [],
			values: {},
			valid: false,
		};

		for (const [field, value] of Object.entries(values)) {
			try {
				const newValue = await this.__validateField(field, value);
				ret.values[field] = newValue;
			} catch (error) {
				if (Array.isArray(error)) ret.errors.push(...error);
				else ret.errors.push(error);
			}
		}

		ret.valid = ret.errors.length <= 0;
		return ret;
	}
}
