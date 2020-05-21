import { Validatueur } from "../api/index";
import { isNone } from "../api/types";
import { errorFrom } from "../api/helpers";

export abstract class AbstractValidator<T, U = T>
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
