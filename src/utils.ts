import { isNone } from "./api/types";
import { Validatueur } from "./api";
import moment from "moment";
import { generateSequence } from "sequency";

export const isEmpty = (str: string) => /^\s*$/.test(str);

export const asStr = <T>(value: T) => {
	if (typeof value == "string") return value;

	return `${value}`;
};

export const isValue = <T>(value: T) => {
	if (isNone(value) || typeof value === "function") return false;

	if (Array.isArray(value)) return true;

	return !isEmpty(asStr(value));
};

export const trim = <T>(value: T) => asStr(value).trim();

export const contains = <T>(values: T[], value: T) =>
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

export const asDate = (
	value?: moment.MomentInput,
	format?: moment.MomentFormatSpecification
): moment.Moment => {
	//NOTE: Date() is not supported
	// use strict mode of moments
	return moment(value, format, true);
};

export const now = (): ReturnType<typeof asDate> => {
	return asDate();
};

const ipv4: RegExp = (() => {
	const max = "25[0-5]" as const;
	const twos = "2[0-4][0-9]" as const;
	const ones = "(?:1[0-9]|[1-9])?[0-9]" as const;

	const part = `(${max}|${twos}|${ones})` as const;
	const re = generateSequence(() => part)
		.take(4)
		.joinToString({
			separator: "\\.", // literal dot, in re "\." but it's a string so double escape
			prefix: "^",
			postfix: "$",
		});

	return new RegExp(re);
})();

export const RegularExpressions = {
	ipv4,
	digit: /[0-9]/,
	lowercaseLetter: /[a-z]/,
	uppercaseLetter: /[A-Z]/,
	specialCharacter: /[\/.!?\[\](){}<>^$€#@,;:\-_%&~"'`|=+*]/,
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

export { moment };
