import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";

export class Regex<T = string> extends AbstractValidator<T, string>{
	public constructor(public re: RegExp){
		super();
	}

	public get rule(): string {
		return "regex";
	}
	protected __validate(value: T): Validatueur.Optional<string> {
		const str = `${value}`;
		if(this.re.test(str))
			return str;
	}
}