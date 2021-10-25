export interface ValidatorArgs<Key extends string = string> {
	args: unknown[];
	field: Key;
	message: string;
}

export interface FormatArgs {
	rule: string;
}

export type Formatter = (obj: FormatArgs) => string;
