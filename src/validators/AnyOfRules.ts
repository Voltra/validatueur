import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
import { RuleChain } from "../rules";
import { Validatueur } from "../api/index";
import { asSequence } from "sequency";
import { isError } from "../api/Error";

export class AnyOfRules<T = any, U = T> extends AbstractValidator<T, U> {
	public get rule(): string {
		return "anyOfRules";
	}
	protected __validate(
		field: string,
		value: T,
		schema: Schema,
		...chains: RuleChain[]
	): Validatueur.Optional<U> {
		const ret = asSequence(chains)
			.map((chain: RuleChain) => chain.__validate(field, value, schema))
			.find(
				(result: Validatueur.Result<any, Validatueur.Error>) =>
					!isError(result)
			);

		if (ret !== null) return ret as U;
	}
}
