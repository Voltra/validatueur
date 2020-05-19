import { Result } from "./types"
import { Error } from "./Error"

export interface Validator<T>{
	validate(value: T, args: string[]): Result<T, Error>;
}