import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../api/Schema";
import { noneIf } from "../api/types";
import { Validatueur } from "../api/index";
import { RuleChain } from "../rules";

export class ObjectOfShape<T = any> extends AbstractValidator<
	T,
	Record<string, any>
> {
	public get rule(): string {
		return "objectOfShape";
	}
	protected async __validate(
		field: string,
		value: T,
		schema: Schema,
		objectSchema: Schema
	): Validatueur.Promise<Record<string, any>> {
		await noneIf(typeof value !== "object", value);

		return objectSchema.validate(value);
	}
}
