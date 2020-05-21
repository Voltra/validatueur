import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asStr } from "../utils";

export class LengthBetween<T = string> extends AbstractValidator<T, string>{
	public get rule(): string {
		return "lengthBetween";
	}
	protected __validate(value: T, min: number, max: number): Validatueur.Optional<string> {
		const str = asStr(value);
		if(min <= str.length && str.length < max)
			return str;
	}
}