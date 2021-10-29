import { ValidatedSchema } from "./ValidatedSchema";
import { RuleChain, Rules } from "../rules";
import { Validatueur } from "./index";
import { Messages } from "./Messages";
import { isError } from "./Error";
import deepcopy from "deepcopy"

export interface SchemaArgs<Keys extends string = string, Values = unknown> {
	rules: Rules<Keys, Values>;
	messages: Messages<Keys>;
}

export interface SchemaFieldValidationResult<T = unknown, U = T, Key extends string = string> {
	field: Key;
	result: Validatueur.Result<U, Validatueur.Error>;
}

export class Schema<Keys extends string = string, Values = unknown> {
	public static from<K extends string = string, V = unknown>({
		rules = {} as Rules<K, V>,
		messages = {} as Messages<K>,
	}: Partial<SchemaArgs<K, V>> = {}): Schema<K, V> {
		return new this<K, V>(rules, messages);
	}

	public includeExtra = false;
	public rawData = {} as Validatueur.Values<Keys, Values>;

	protected constructor(
		public readonly ruleSet: Rules<Keys, Values>,
		public readonly messages: Messages<Keys>
	) {}

	public async __validateField<T = unknown, U = T, Key extends Keys = Keys>(
		field: Key,
		value: T
	): Validatueur.Promise<SchemaFieldValidationResult<T, U|T, Key>, Validatueur.Error<Key>> {
		if (!(field in this.ruleSet))
			return {
				field,
				result: value,
			};

		const ruleChain = this.ruleSet[field] as RuleChain<unknown, U|Values>;
		const result = (await ruleChain.__validate<Keys, Key, U|Values>(field, value, this)) as U;

		return {
			field,
			result,
		};
	}

	public async validate(
		values: Validatueur.Values<Keys, Values>,
		includeExtra: boolean = false
	): Promise<ValidatedSchema<Keys, Values>> {
		const ret: ValidatedSchema<Keys, Values> = {
			errors: [],
			values: {} as Validatueur.Values<Keys, Values>,
			valid: false,
		};

		this.includeExtra = includeExtra;
		this.rawData = deepcopy(values);

		const errorMap = new Map<Keys, Validatueur.Error<Keys>>();
		const entries = Object.entries(values) as ([Keys, Values])[];

		for (const [field, value] of entries) {
			if (!(field in this.ruleSet) && !this.includeExtra) continue;

			try {
				const { result } = await this.__validateField<Values, Values, Keys>(field, value);
				ret.values[field] = result as Values;
			} catch (error: unknown) {
				if (Array.isArray(error)) {
					error.forEach((e: Validatueur.Error<Keys>) => {
						if (!errorMap.has(e.field)) errorMap.set(e.field, e);
					});
				} else if(isError(error)) {
					const e = error as Validatueur.Error<Keys>;

					if (!errorMap.has(e.field)) {
						errorMap.set(e.field, e);
					}
				}
			}
		}

		ret.errors = [...errorMap.values()];
		ret.valid = ret.errors.length <= 0;
		this.rawData = {} as typeof values; // reset the raw data to avoid further modifications/access
		return ret;
	}
}
