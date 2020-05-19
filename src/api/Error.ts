import { Optional } from "./types"

export interface Error{
	field: string,
	message: string,
	rule: Optional<string>,
}