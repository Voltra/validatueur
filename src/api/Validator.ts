import { Result, Optional } from "./types";
import { Error } from "./Error";
import { ValidatorArgs } from "./ValidatorArgs";

export interface Validator<T, U = T> {
	validate(value: T, args: ValidatorArgs): Result<U, Error>;
}

export interface ValidatorWrapper<T, U = T> {
	parent: Optional<ValidatorWrapper<any, T>>;
	args: any[];
	rule: string;

	validator(): Validator<T, U>;
}
