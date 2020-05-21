import { Optional as _Optional, Result as _Result, None as _None } from "./types"
import { Messages as _Messages } from "./Messages"
import { Error as _Error } from "./Error"
import { ValidatorArgs as _ValidatorArgs, FormatArgs as _FormatArgs } from "./ValidatorArgs"
import { Validator as _Validator } from "./Validator"
import { Sanitizer as _Sanitizer } from "./Sanitizer"
import { errorFrom as _errorFrom } from "./helpers"

export namespace Validatueur{
	type Optional<T> = _Optional<T>;
	type None = _None;
	type Result<T, E> = _Result<T, E>;

	type Messages = _Messages;
	type Error = _Error;

	type ValidatorArgs = _ValidatorArgs;
	type FormatArgs = _FormatArgs;
	type Validator<T> = _Validator<T>;
	type Sanitizer<T, E = T> = _Sanitizer<T, E>;

	const errorFrom = _errorFrom;
}