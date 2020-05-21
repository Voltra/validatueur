import { isNone } from "./api/types";

export const isEmpty = (str: string) => /^\s*$/.test(str);

export const isValue = (value: any) => {
	return !isNone(value) && !isEmpty(`${value}`);
};
