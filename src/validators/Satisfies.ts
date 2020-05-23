import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
import { noneIf } from "../api/types";
import { Validatueur } from "../api/index";

export class Satisfies<T = any> extends AbstractValidator<T>{
	public get rule(): string {
		return "satisfies";
	}
	protected __validate(field: string, value: T, schema: Schema, predicate: (value: T) => boolean): Validatueur.Promise<T> {
		return noneIf(!predicate(value), value);
	}
}