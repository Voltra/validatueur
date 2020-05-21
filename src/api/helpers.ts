import { Extended, Result, isNone, Optional } from "./types";
import { ValidatorArgs, FormatArgs } from "./ValidatorArgs";
import { Error } from "./Error";
import { precompile } from "./templating";
import { Sanitizer } from "./Sanitizer";
import { Validator, ValidatorWrapper } from "./Validator";

/**
 * Create an error object from the validation and formatting arguments
 * @param args - The validation arguments
 * @param fmtArgs - The formatting arguments
 */
export const errorFrom = (
	args: ValidatorArgs,
	fmtArgs: Extended<FormatArgs>
): Error => {
	const message = precompile(args)(fmtArgs);

	return {
		message,
		field: args.field,
		rule: fmtArgs.rule,
	};
};

/**
 * Wrap a sanitizer into a function that generates validators
 * @param rule - The name of the sanitization rule
 * @param sanitizer - The sanitizer to wrap
 */
export const sanitizerWrapperGenerator = <T, U>(
	rule: string,
	sanitizer: Sanitizer<T, U>
) => {
	return <V>(
		parent: Optional<ValidatorWrapper<V, T>> = null,
		...args: any[]
	) => ({
		parent,
		args,
		rule,
		validator(): Validator<T, U> {
			return {
				validate(value: T, vargs: ValidatorArgs): Result<U, Error> {
					vargs.args = args; //replace provided arguments with already given arguments
					const opt = sanitizer.sanitize(value, vargs);

					if (isNone(opt))
						return errorFrom(vargs, {
							rule,
						});
					else return opt as U;
				},
			};
		},
	});
};
