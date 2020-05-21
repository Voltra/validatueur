import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";

export class Regex<T = string> extends AbstractValidator<T, string> {
	public get rule(): string {
		return "regex";
	}
	protected __validate(
		value: T,
		re: RegExp,
		full: boolean = false
	): Validatueur.Optional<string> {
		const str = `${value}`;
		const validates = full ? () => re.test(str) : () => str.match(str);
		if (validates()) return str;
	}
}
