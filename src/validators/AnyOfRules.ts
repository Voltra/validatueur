import { Validatueur } from "../api";
import { RuleChain } from "../rules";
import { AbstractValidator } from "./AbstractValidator";

export class AnyOfRules<T = any, U = T> extends AbstractValidator<T, U> {
	public get rule(): string {
		return "anyOfRules";
	}

	protected async __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema,
		...chains: RuleChain[]
	): Validatueur.Promise<U> {
		for (const chain of chains) {
			try {
				const ret = await chain.__validate(field, value, schema);
				return ret;
			} catch (_) {
				// continue;
			}
		}

		throw Validatueur.none;
	}
}
