import { Optional, ValidationPromise } from "./types";
import { ValidatorArgs } from "./ValidatorArgs";

export interface Sanitizer<T, U = T> {
	shouldSanitise(value: T, args: ValidatorArgs): boolean;
	sanitize(value: T, args: ValidatorArgs): ValidationPromise<U>;
}
