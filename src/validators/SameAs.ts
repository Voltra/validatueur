import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import noneIf = Validatueur.noneIf;
import { isError } from "../api/Error";

export class SameAs<T = unknown> extends AbstractValidator<T> {
	public get rule() {
		return "sameAs" as const;
	}

	protected async __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys, OtherKey extends Keys = Keys>(
		field: Key,
		value: T,
		schema: Validatueur.Schema<Keys, Values>,
		otherField: OtherKey
	): Validatueur.Promise {
		//TODO: Assert same value
		const { result: otherResult } = await schema.__validateField<unknown, unknown, OtherKey>(
			otherField,
			schema.rawData[otherField]
		);

		const { result: thisResult } = await schema.__validateField<T, T, Key>(
			field,
			value
		);

		if (isError(otherResult) || isError(thisResult)) throw Validatueur.none;

		const otherValue = otherResult as any;
		const thisValue = thisResult as any;
		return noneIf(thisValue !== otherValue, thisValue);
	}
}
