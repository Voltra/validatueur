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
	protected async __validate(
		field: string,
		value: T,
		schema: Schema,
		...chains: RuleChain[]
	): Validatueur.Promise<U> {
		for (const chain of chains) {
			try {
				const ret = await chain.__validate(field, value, schema);
				return ret;
			} catch (e) {
				continue;
			}
		}
	}
}
