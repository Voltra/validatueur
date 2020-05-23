import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../api/Schema";
import { noneIf } from "../api/types";
import { Validatueur } from "../api/index";
import { contains } from "../utils";

export class NotIn<T = any> extends AbstractValidator<T> {
	public get rule(): string {
		return "notIn";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Schema,
		values: any[]
	): Validatueur.Promise<T> {
		return noneIf(contains(values, value), value);
	}
}
