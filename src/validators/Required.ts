import { Validatueur } from "../api/index";
import { AbstractValidator } from "./AbstractValidator";
import { isValue } from "../utils";

export class Required<T = any> extends AbstractValidator<T> {
	public get rule(): string {
		return "required";
	}

	protected __validate(value: T): Validatueur.Optional<T> {
		if (isValue(value)) return value;
	}
}
