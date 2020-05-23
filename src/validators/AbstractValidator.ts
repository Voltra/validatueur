import { Validatueur } from "../api/index";
import { isNone } from "../api/types";
import { errorFrom } from "../api/helpers";
import { extendRules } from "../rules";

export abstract class AbstractValidator<T = any, U = T>
	implements Validatueur.Validator<T, U> {
	public async validate(
		value: T,
		args: Validatueur.ValidatorArgs,
		schema: Validatueur.Schema
	): Validatueur.Promise<U, Validatueur.Error> {
		try{
			const ret = await this.__validate(args.field, value, schema, args.args);
			return ret;
		}catch(_){ //TODO: Maybe refactor __validate interface to return result (instead of optional), would allow "error impersonation"
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
