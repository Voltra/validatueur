import {
	Optional as _Optional,
	Result as _Result,
	None as _None,
	Extended as _Extended,
	none as _none,
} from "./types";
import { Messages as _Messages } from "./Messages";
import { Error as _Error } from "./Error";
import {
	ValidatorArgs as _ValidatorArgs,
	FormatArgs as _FormatArgs,
} from "./ValidatorArgs";
import {
	Validator as _Validator,
	ValidatorWrapper as _ValidatorWrapper,
} from "./Validator";
import { Sanitizer as _Sanitizer } from "./Sanitizer";
import { Schema as _Schema } from "./Schema";
import { ValidatedSchema as _ValidatedSchema } from "./ValidatedSchema";

export namespace Validatueur {
	export type Optional<T> = _Optional<T>;
	export type None = _None;
	export type Result<T, E> = _Result<T, E>;
	export type Extended<T> = _Extended<T>;
	export const none = _none;

	export type Messages = _Messages;
	export type Error = _Error;

	export type ValidatorArgs = _ValidatorArgs;
	export type FormatArgs = _FormatArgs;
	export type Validator<T, U = T> = _Validator<T, U>;
	export type Sanitizer<T, U = T> = _Sanitizer<T, U>;
	export type ValidatorWrapper<T, U = T> = _ValidatorWrapper<T, U>;

	export type Schema = _Schema;
	export type ValidatedSchema = _ValidatedSchema;
}
