import { isNone } from "./api/types";
import { Validatueur } from "./api/index";
import moment from "moment";

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
	values.some(v => v === value);

export const asNumber = <T>(value: T) => {
	if (typeof value == "number") return value;

	const str = asStr(value);
	const integer = parseInt(str, 10);
	const float = parseFloat(str);

	// JS engine implementations may treat floats and integer differently
	// (e.g. greater precision for integers)
	return integer === float ? integer : float;
};

export const asDate = <T = any>(value?: T, format?: string): moment.Moment => {
	// use strict mode of moments
	return moment.utc(value, format, true);
};

export const now = <T = any>(): ReturnType<typeof asDate> => {
	return asDate(undefined);
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
	integer(value: any, base: number = 10) {
		const nb = parseInt(value, base);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	},
	float(value: any) {
		const nb = parseFloat(value);
		return Validatueur.noneIf(Sanitizers.__isNaN(nb), nb);
	},
	moment<T>(value: T, format?: string) {
		const date = asDate(value, format);
		return Validatueur.noneIf(date.isValid(), date);
	},
	async date<T>(value: T, format?: string) {
		const date = await Sanitizers.moment(value, format);
		return date.toDate();
	},
	async ago<T>(value: T, format?: string) {
		const date = await Sanitizers.moment(value, format);
		return date.fromNow();
	},
	async momentDisplay<T>(
		value: T,
		{ parseFormat = undefined, displayFormat = undefined } = {}
	) {
		const date = await Sanitizers.moment(value, parseFormat);
		return date.format(displayFormat);
	},
};

export { moment, }
