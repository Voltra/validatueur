import { Validatueur } from "../api/index";
import { isNone } from "../api/types";
import { errorFrom } from "../api/helpers";
import { extendRules } from "../rules"

export abstract class AbstractValidator<T = any, U = T>
	implements Validatueur.Validator<T, U> {
	public validate(
		value: T,
		args: Validatueur.ValidatorArgs
	): Validatueur.Result<U, Validatueur.Error> {
		const opt = this.__validate(value, args.args);
		if (isNone(opt)) return errorFrom(args, this);

		return opt as U;
	}

	public abstract get rule(): string;
	protected abstract __validate(
		value: T,
		...args: any[]
	): Validatueur.Optional<U>;
}

export const registerValidator = <T = any, U = T>(validator: AbstractValidator<T, U>) => {
	extendRules(validator.rule, (...args: any[]) => {
		return {
			parent: Validatueur.none,
			child: Validatueur.none,
			args,
			rule: validator.rule,
			validator(){
				return validator;
			},
		};
	});
};