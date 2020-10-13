import { Validatueur } from "../api";
import { errorFrom } from "../api/helpers";
import { extendRules } from "../rules";
import { isValue } from "../utils";

export abstract class AbstractValidator<T = any, U = T>
	implements Validatueur.Validator<T, U> {
	public shouldValidate(value: T, args: Validatueur.ValidatorArgs, schema: Validatueur.Schema): boolean {
		return isValue(value);
	}

	public async validate(
		value: T,
		args: Validatueur.ValidatorArgs,
		schema: Validatueur.Schema
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

	protected abstract __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		...args: any[]
	): Validatueur.Promise<U>;
}

export const registerValidator = <T = any, U = T>(
	validator: AbstractValidator<T, U>
) => {
	extendRules(validator.rule, (...args: any[]) => {
		const { none } = Validatueur;

		return {
			parent: none,
			child: none,
			args,
			rule: validator.rule,
			validator() {
				return validator;
			},
		};
	});
};
