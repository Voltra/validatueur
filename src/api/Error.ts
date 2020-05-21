import { Optional } from "./types"

export interface Error{
	field: string,
	message: string,
	rule: Optional<string>,
}

export const isError = (e: any) => e && [
	"field",
	"message",
	"rule",
].every(key => key in e);