import { Validatueur } from "../api";
import { RuleChain } from "../rules";
import { AbstractValidator } from "./AbstractValidator";

export class AnyOfRules<T = unknown, U = T> extends AbstractValidator<T, U> {
	public get rule() {
		return "anyOfRules" as const;
	}

	protected async __validate<Keys extends string = string, Values = unknown, Key extends Keys = Keys>(
		field: Key,
		value: T,
		schema: Validatueur.Schema<Keys, Values>,
		...chains: RuleChain[]
	): Validatueur.Promise<U> {
		for (const chain of chains) {
			try {
				const ret = await chain.__validate<Keys, Key, Values>(field, value, schema);
				return ret as U;
			} catch (_) {
				// continue;
			}
		}

		throw Validatueur.none;
	}
}
