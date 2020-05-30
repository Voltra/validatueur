import { ValidatedSchema } from "./ValidatedSchema";
import { RuleChain, Rules } from "../rules";
import { Validatueur } from "./index";
import { Messages } from "./Messages";

export interface SchemaArgs {
	rules: Rules;
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

	public includeExtra = false;
	public rawData: Validatueur.Values = {};

	protected constructor(
		public readonly ruleSet: Rules,
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
		values: Validatueur.Values,
		includeExtra: boolean = false
	): Validatueur.Promise<ValidatedSchema> {
		const ret: ValidatedSchema = {
			errors: [],
			values: {},
			valid: false,
		};

		this.includeExtra = includeExtra;
		this.rawData = values; //TODO: make a deep copy to avoid unintended mutations

		const errorMap = new Map<string, Validatueur.Error>();

		for (const [field, value] of Object.entries(values)) {
			if (!(field in this.ruleSet) && !this.includeExtra) continue;

			try {
				const newValue = await this.__validateField(field, value);
				ret.values[field] = newValue;
			} catch (error) {
				/*if (Array.isArray(error)) ret.errors.push(...error);
				else ret.errors.push(error);*/
				if (Array.isArray(error)) {
					error.forEach((e: Validatueur.Error) => {
						if (!errorMap.has(e.field)) errorMap.set(e.field, e);
					});
				} else if (!errorMap.has(error.field)) {
					errorMap.set(error.field, error);
				}
			}
		}

		ret.errors = [...errorMap.values()];
		ret.valid = ret.errors.length <= 0;
		return ret;
	}
}
