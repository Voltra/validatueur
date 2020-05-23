import { Extended, Result, isNone, Optional, none, ValidationPromise } from "./types";
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
export const sanitizerWrapperGenerator = <T = any, U = T>(
	rule: string,
	sanitizer: Sanitizer<T, U>
) => {
	return (...args: any[]) => ({
		parent: none,
		child: none,
		args,
		rule,
		validator(): Validator<T, U> {
			return {
				async validate(value: T, vargs: ValidatorArgs): ValidationPromise<U, Error> {
					vargs.args = args; //replace provided arguments with already given arguments

					try{
						const opt = await sanitizer.sanitize(value, vargs);
						return opt;
					}catch(_){
						throw errorFrom(vargs, {
							rule,
						});
					}
				},
			};
		},
	});
};
