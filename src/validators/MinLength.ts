import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asStr } from "../utils";

export class MinLength<T = string> extends AbstractValidator<T, string> {
	public get rule(): string {
		return "minLength";
	}

	protected __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		min: number,
		exclusive: boolean = false
	): Validatueur.Promise<string> {
		const str = asStr(value);
		const validates = exclusive ? str.length > min : str.length >= min;
		return Validatueur.noneIf(!validates, str);
	}
}
