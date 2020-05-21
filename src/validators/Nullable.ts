import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { isValue } from "../utils";

export class Nullable<T> extends AbstractValidator<T|null>{
	public get rule(): string {
		return "nullable";
	}

	protected __validate(value: T|null): Validatueur.Optional<T | null> {
		if(!isValue(value))
			return null;

		return value;
	}
}