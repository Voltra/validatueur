import { isNone } from "./api/types";

export const isEmpty = (str: string) => /^\s*$/.test(str);

export const asStr = <T>(value: T) => {
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
