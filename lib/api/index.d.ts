import { Optional as _Optional, Result as _Result, None as _None, Extended as _Extended, ValidationPromise as _Promise } from "./types";
import { Messages as _Messages } from "./Messages";
import { Error as _Error } from "./Error";
import { ValidatorArgs as _ValidatorArgs, FormatArgs as _FormatArgs } from "./ValidatorArgs";
import { Validator as _Validator, ValidatorWrapper as _ValidatorWrapper } from "./Validator";
import { Sanitizer as _Sanitizer } from "./Sanitizer";
import { Schema as _Schema } from "./Schema";
import { ValidatedSchema as _ValidatedSchema } from "./ValidatedSchema";
export declare namespace Validatueur {
    type Optional<T> = _Optional<T>;
    type None = _None;
    type Result<T, E> = _Result<T, E>;
    type Extended<T> = _Extended<T>;
    type Promise<T = any, E = any> = _Promise<T, E>;
    const Promise: PromiseConstructor;
    const none: undefined;
    const noneIf: <T>(condition: boolean, value: T) => _Promise<T, undefined>;
    type Messages = _Messages;
    type Error = _Error;
    type ValidatorArgs = _ValidatorArgs;
    type FormatArgs = _FormatArgs;
    type Validator<T = any, U = T> = _Validator<T, U>;
    type Sanitizer<T = any, U = T> = _Sanitizer<T, U>;
    type ValidatorWrapper<T = any, U = T> = _ValidatorWrapper<T, U>;
    type Schema = _Schema;
    type ValidatedSchema = _ValidatedSchema;
}
