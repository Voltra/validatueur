import { pope } from "pope/dist/pope";
import { ValidatorArgs, FormatArgs, Formatter } from "./ValidatorArgs";
import { Extended } from "./types";

/**
 * Convert the validato args to a record for the output
 * @param args - The validator args
 */
const recordFromArgs = <Key extends string = string>(args: ValidatorArgs<Key>) => {
	const rec: Record<string, unknown> = {
		...args,
	};

	delete rec.message;

	return rec;
};

/**
 * Precompile the error message for the given arguments
 * @param args - The arguments for the validator
 */
export const precompile = <Key extends string = string>(args: ValidatorArgs<Key>): Formatter => {
	const fmtArg = recordFromArgs(args);

	return (obj: Extended<FormatArgs>) =>
		pope(
			args.message,
			{
				...obj,
				...fmtArg,
			},
			{
				skipUndefined: true,
			}
		);
};
