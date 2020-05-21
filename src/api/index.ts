import {
	Optional as _Optional,
	Result as _Result,
	None as _None,
	Extended as _Extended,
} from "./types";
import { Messages as _Messages } from "./Messages";
import { Error as _Error } from "./Error";
import {
	ValidatorArgs as _ValidatorArgs,
	FormatArgs as _FormatArgs,
} from "./ValidatorArgs";
import { Validator as _Validator } from "./Validator";
import { Sanitizer as _Sanitizer } from "./Sanitizer";
import { Schema as _Schema } from "./Schema";
import { ValidatedSchema as _ValidatedSchema } from "./ValidatedSchema";

export namespace Validatueur {
	export type Optional<T> = _Optional<T>;
	export type None = _None;
	export type Result<T, E> = _Result<T, E>;
	export type Extended<T> = _Extended<T>;

	export type Messages = _Messages;
	export type Error = _Error;

	export type ValidatorArgs = _ValidatorArgs;
	export type FormatArgs = _FormatArgs;
	export type Validator<T> = _Validator<T>;
	export type Sanitizer<T, E = T> = _Sanitizer<T, E>;

	export const Schema = _Schema;
	export type ValidatedSchema = _ValidatedSchema;
}
