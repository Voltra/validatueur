import { ValidatorArgs, FormatArgs } from "./ValidatorArgs"
import { Error } from "./Error"
import { precompile } from "./templating"

/**
 * Create an error object from the validation and formatting arguments
 * @param args - The validation arguments
 * @param fmtArgs - The formatting arguments
 */
export const errorFrom = (args: ValidatorArgs, fmtArgs: FormatArgs): Error => {
	const message = precompile(args)(fmtArgs);

	return {
		message,
		field: args.field,
		rule: fmtArgs.rule,
	};
};