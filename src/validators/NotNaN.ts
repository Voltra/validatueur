import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { asNumber } from "../utils";

export class NotNaN<T = number> extends AbstractValidator<T, number>{
	public get rule(): string {
		return "notNaN";
	}
	protected __validate(value: T, ...args: any[]): Validatueur.Optional<number> {
		const nb = asNumber(value);
		if(!isNaN(nb))
			return nb;
	}
}