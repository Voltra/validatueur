import { AbstractValidator } from "./AbstractValidator";
import { noneIf } from "../api/types";
import { Validatueur } from "../api";

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
		schema: Validatueur.Schema,
		objectSchema: Validatueur.Schema
	): Validatueur.Promise<Record<string, any>> {
		await noneIf(typeof value !== "object", value);

		const { errors, values, valid } = await objectSchema.validate(
			value,
			objectSchema.includeExtra || schema.includeExtra
		);

		if (valid) return values;
		else throw errors;
	}
}
