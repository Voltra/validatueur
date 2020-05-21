import compile from "string-template/compile"
import { ValidatorArgs, FormatArgs, Formatter } from "./ValidatorArgs"

const recordFromArgs = (args: ValidatorArgs) => {
	const rec: Record<string, any> = {
		...args,
	};

	delete rec.message;
	defineArrayArgs(args.args, rec);

	return rec;
};

const defineArrayArg = (payload: Record<string, any>) => (value: string, i: number) => {
	payload[`args${i}`] = value;
};

const defineArrayArgs = (args: string[], payload: Record<string, any>) => {
	args.forEach(defineArrayArg(payload));
};

/**
 * Precompile the error message for the given arguments
 * @param {ValidatorArgs} args - The arguments for the validator
 * @returns {Formatter}
 */
export const precompile = (args: ValidatorArgs) => {
	const compiled = compile(args.message);

	const fmtArg = recordFromArgs(args);

	return (obj: FormatArgs) => compiled({
		...obj,
		...fmtArg,
	});
};