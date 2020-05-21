import { Result } from "./types"
import { Error } from "./Error"
import { ValidatorArgs } from "./ValidatorArgs"

export interface Validator<T>{
	validate(value: T, args: ValidatorArgs): Result<T, Error>;
}

export interface ValidatorWrapper<T>{
	args: string[];

	validator(): Validator<T>;
}