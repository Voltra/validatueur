import {
	Optional as _Optional,
	Result as _Result,
	None as _None,
	Extended as _Extended,
	ValidationPromise as _Promise,
	none as _none,
	noneIf as _noneIf,
} from "./types";
import { Messages as _Messages } from "./Messages";
import { Error as _Error } from "./Error";
import { Values as _Values } from "./Values";
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
	export type Promise<T = unknown, E = unknown> = _Promise<T, E>;
	export const Promise = _Promise; // ts 1055, this is completely retarded, typescript fix this
	export const none = _none;
	export const noneIf = _noneIf;

	export type Messages<K extends string = string> = _Messages<K>;
	export type Error<K extends string = string> = _Error<K>;
	export type Values<K extends string = string, V = unknown> = _Values<K, V>;

	export type ValidatorArgs<K extends string = string> = _ValidatorArgs<K>;
	export type FormatArgs = _FormatArgs;
	export type Validator<T = unknown, U = T> = _Validator<T, U>;
	export type Sanitizer<T = unknown, U = T> = _Sanitizer<T, U>;
	export type ValidatorWrapper<T = unknown, U = T> = _ValidatorWrapper<T, U>;

	export type Schema<K extends string = string, V = unknown> = _Schema<K, V>;
	export type ValidatedSchema<K extends string = string, V = unknown> = _ValidatedSchema<K, V>;
}
