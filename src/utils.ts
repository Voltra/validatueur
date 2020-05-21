import { isNone } from "./api/types";

export const isEmpty = (str: string) => /^\s*$/.test(str);

export const asStr = <T>(value: T) => {
	return `${value}`;
};

export const isValue = <T>(value: T) => {
	return !isNone(value) && !isEmpty(asStr(value));
};

export const trim = <T>(value: T) => asStr(value).trim();

export const contains = (values: any[], value: any) =>
	values.some((v) => v === value);
