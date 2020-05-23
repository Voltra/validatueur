import { Result, Optional, Promise } from "./types";
import { Error } from "./Error";
import { ValidatorArgs } from "./ValidatorArgs";
import { Schema } from "./Schema";

export interface Validator<T = any, U = T> {
	validate(value: T, args: ValidatorArgs, schema: Schema): Promise<U, Error>;
}

export interface ValidatorWrapper<T = any, U = T> {
	parent: Optional<ValidatorWrapper<any, T>>;
	child: Optional<ValidatorWrapper<U, any>>;
	args: any[];
	rule: string;

	validator(): Validator<T, U>;
}
