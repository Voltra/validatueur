import { Validatueur } from "../api/index";
import { isNone } from "../api/types";
import { errorFrom } from "../api/helpers";
import { extendRules } from "../rules";

//TODO: Maybe refactor __validate interface to return result (would allow error impersonation)

export abstract class AbstractValidator<T = any, U = T>
	implements Validatueur.Validator<T, U> {
	public validate(
		field: string,
		value: T,
		args: Validatueur.ValidatorArgs,
		schema: Validatueur.Schema
	): Validatueur.Result<U, Validatueur.Error> {
		const opt = this.__validate(field, value, schema, args.args);
		if (isNone(opt)) return errorFrom(args, this);

		return opt as U;
	}

	public abstract get rule(): string;

	protected abstract __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		...args: any[]
	): Validatueur.Optional<U>;
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
