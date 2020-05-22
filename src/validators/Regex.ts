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
		const validates = full ? re.test(str) : !!str.match(str);
		if (validates) return str;
	}
}

// Cannot use this w/ protected members
/* export const extendFromRegex = <T>(name: string, re: RegExp, full: boolean = false) =>
	class ExtendedRegex<T = string> extends Regex<T>{
		public get rule(): string{
			return name;
		}

		protected __validate(value: T): Validatueur.Optional<string>{
			return super.__validate(value, re, full);
		}
	}; */
