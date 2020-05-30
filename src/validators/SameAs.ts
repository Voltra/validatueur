import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api";
import noneIf = Validatueur.noneIf;
import { isError } from "../api/Error";

export class SameAs<T = any> extends AbstractValidator<T, any> {
	public get rule(): string {
		return "sameAs";
	}

	protected async __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		otherField: string
	): Validatueur.Promise {
		//TODO: Assert same value
		const { result: otherResult } = await schema.__validateField(
			otherField,
			schema.rawData[otherField]
		);
		const { result: thisResult } = await schema.__validateField(
			otherField,
			value
		);

		if (isError(otherResult) || isError(thisResult)) throw Validatueur.none;

		const otherValue = otherResult as any;
		const thisValue = otherValue as any;
		return noneIf(thisValue !== otherValue, thisValue);
	}
}
