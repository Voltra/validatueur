import { pope } from "pope/dist/pope";
import { ValidatorArgs, FormatArgs, Formatter } from "./ValidatorArgs";
import { Extended } from "./types";

/**
 * Convert the validato args to a record for the output
 * @param args - The validator args
 */
const recordFromArgs = (args: ValidatorArgs) => {
	const rec: Record<string, any> = {
		...args,
	};

	delete rec.message;

	return rec;
};

/**
 * Precompile the error message for the given arguments
 * @param args - The arguments for the validator
 */
export const precompile = (args: ValidatorArgs): Formatter => {
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
