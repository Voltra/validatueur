import { Result, Optional } from "./types";
import { Error } from "./Error";
import { ValidatorArgs } from "./ValidatorArgs";
import { Schema } from "./Schema";

export interface Validator<T, U = T> {
	validate(value: T, args: ValidatorArgs, schema: Schema): Result<U, Error>;
}

export interface ValidatorWrapper<T, U = T> {
	parent: Optional<ValidatorWrapper<any, T>>;
	child: Optional<ValidatorWrapper<U, any>>;
	args: any[];
	rule: string;

	validator(): Validator<T, U>;
}
