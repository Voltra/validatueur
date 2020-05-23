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
	): Validatueur.Promise<U> {
		return Promise.race(
			chains.map(chain => chain.__validate(field, value, schema))
		);
	}
}
