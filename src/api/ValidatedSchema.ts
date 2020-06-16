import { Error } from "./Error";

export interface ValidatedSchema {
	errors: Error[];
	values: Record<string, any>;
	valid: boolean;
}
