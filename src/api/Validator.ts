import { Optional, ValidationPromise } from "./types";
import { Error } from "./Error";
import { ValidatorArgs } from "./ValidatorArgs";
import { Schema } from "./Schema";

export interface Validator<T = unknown, U = T> {
	shouldValidate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		value: T,
		args: ValidatorArgs<Key>,
		schema: Schema<Keys, Values>
	): boolean;

	validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		value: T,
		args: ValidatorArgs<Key>,
		schema: Schema<Keys, Values>
	): ValidationPromise<U, Error>;
}

export interface ValidatorWrapper<T = unknown, U = unknown> {
	parent: Optional<ValidatorWrapper<unknown, T>>;
	child: Optional<ValidatorWrapper<U, unknown>>;
	args: unknown[];
	rule: string;

	validator(): Validator<T, U>;
}
