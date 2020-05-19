import { Optional as _Optional, Result as _Result, None as _None } from "./types"
import { Messages as _Messages } from "./Messages"
import { Error as _Error } from "./Error"
import { Validator as _Validator } from "./Validator"
import { Sanitizer as _Sanitizer } from "./Sanitizer"

export namespace Validatueur{
	type Messages = _Messages;
	type Error = _Error;
	type Optional<T> = _Optional<T>;
	type None = _None;
	type Result<T, E> = _Result<T, E>;
	type Validator<T> = _Validator<T>;
	type Sanitizer<T, E = T> = _Sanitizer<T, E>;
}