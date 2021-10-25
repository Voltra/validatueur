import { Validatueur } from "../api";
import { errorFrom } from "../api/helpers";
import { extendRules, RuleChain } from "../rules";
import { isValue } from "../utils";

export abstract class AbstractValidator<T = unknown, U = unknown> implements Validatueur.Validator<T, U> {
	public shouldValidate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		value: T,
		args: Validatueur.ValidatorArgs<Key>,
		schema: Validatueur.Schema<Keys, Values>
	): boolean {
		return isValue(value);
	}

	public async validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		value: T,
		args: Validatueur.ValidatorArgs<Key>,
		schema: Validatueur.Schema<Keys, Values>
	): Validatueur.Promise<U, Validatueur.Error> {
		try {
			if(!this.shouldValidate(value, args, schema))
				return value as any as U; // if not required, delegate to other validators

			const ret = await this.__validate(
				args.field,
				value,
				schema,
				args.args
			);

			return ret;
		} catch (_) {
			//TODO: Maybe refactor __validate interface to return result (instead of optional), would allow "error impersonation"
			throw errorFrom(args, this);
		}
	}

	public abstract get rule(): string;

	protected abstract __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		value: T,
		schema: Validatueur.Schema<Keys, Values>,
		...args: unknown[]
	): Validatueur.Promise<U>;
}

export const registerValidator = <T = unknown, U = T>(
	validator: AbstractValidator<T, U>
) => {
	extendRules<unknown, T, U>(validator.rule, function<A = unknown>(this: RuleChain<A, T>, ...args: unknown[]) {
		const { none } = Validatueur;

		return {
			args,
			parent: this.__getLast(),
			child: none,
			rule: validator.rule,
			validator() {
				return validator;
			},
		};
	});
};
