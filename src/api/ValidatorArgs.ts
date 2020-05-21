export interface ValidatorArgs{
	args: string[],
	field: string,
	message: string,
}

export interface FormatArgs /* extends ValidatorArgs */ {
	rule: string,
}

export type Formatter = (obj: FormatArgs) => string;