import { Error } from "./Error";

export interface ValidatedSchema {
	errors: Error[];
	data: Record<string, any>;
}
