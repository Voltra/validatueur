import { isNone } from "./api/types";
import { Validatueur } from "./api/index";

export const isEmpty = (str: string) => /^\s*$/.test(str);

export const asStr = <T>(value: T) => {
	if (typeof value == "string") return value;

	return `${value}`;
};

export const isValue = <T>(value: T) => {
	return !isNone(value) && !isEmpty(asStr(value));
};

export const trim = <T>(value: T) => asStr(value).trim();

export const contains = <T>(values: any[], value: T) =>
	values.some((v) => v === value);

export const asNumber = <T>(value: T) => {
	if (typeof value == "number") return value;

	const str = asStr(value);
	const integer = parseInt(str, 10);
	const float = parseFloat(str);

	// JS engine implementations may treat floats and integer differently
	// (e.g. greater precision for integers)
	return integer === float ? integer : float;
};

export const RegularExpressions = {
	digit: /[0-9]/,
	lowercaseLetter: /[a-z]/,
	uppercaseLetter: /[A-Z]/,
	specialCharacter: /[\/\.!\?\[\]\(\)\{\}\<\>\^\$€#@,;:\-_%&~"'`\|=\+\*]/,
};

export const Sanitizers = {
	//// Utils
	__isNaN(value: number) {
		return isNaN(value);
	},

	//// Sanitizer
	number<T>(value: T) {
		const nb = asNumber(value);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	},
	integer(value, base: number = 10) {
		const nb = parseInt(value, base);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	},
	float(value) {
		const nb = parseFloat(value);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	},
};
