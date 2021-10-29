import { AbstractValidator } from "./AbstractValidator";
import { noneIf } from "../api/types";
import { Validatueur } from "../api";

export class ObjectOfShape<Keys extends string = string, Values = unknown> extends AbstractValidator<
	Record<Keys, Values>
> {
	public get rule() {
		return "objectOfShape" as const;
	}

	protected async __validate<SchemaKeys extends string = string, SchemaValues = unknown, Key extends SchemaKeys = SchemaKeys>(
		field: Key,
		value: Record<Keys, Values>,
		schema: Validatueur.Schema<SchemaKeys, SchemaValues>,
		objectSchema: Validatueur.Schema<Keys, Values>
	): Validatueur.Promise<Record<Keys, Values>> {
		await noneIf(typeof value !== "object", value);

		const { errors, values, valid } = await objectSchema.validate(
			value,
			objectSchema.includeExtra || schema.includeExtra
		);

		if (valid) return values;
		else throw errors;
	}
}
