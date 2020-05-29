import { Validatueur } from "./api/index";
import { isNone } from "./api/types";
import { getFirst, getLast } from "./api/helpers";

const noop = <T>(): Validatueur.ValidatorWrapper<T> => {
	return {
		parent: Validatueur.none,
		child: Validatueur.none,
		args: [],
		rule: "",
		validator(): Validatueur.Validator<T> {
			return {
				validate(
					value: T,
					_vargs: Validatueur.ValidatorArgs,
					_schema: Validatueur.Schema
				): Validatueur.Promise<T, Validatueur.Error> {
					return Promise.resolve(value);
				},
			};
		},
	};
};

export class RuleChain<T = any, U = T>
	implements Validatueur.Extended<RuleChain<T, U>> {
	public constructor(protected root: Validatueur.ValidatorWrapper<T, U>) {}

	public __getFirst<A = T, B = U>(): Validatueur.ValidatorWrapper<A, B> {
		return getFirst<T, U, A, B>(this.root);
	}

	public __getLast<A = T, B = U>(): Validatueur.ValidatorWrapper<A, B> {
		return getLast<T, U, A, B>(this.root);
	}

	public async __validate(
		field: string,
		value: T,
		schema: Validatueur.Schema
	): Validatueur.Promise<any, Validatueur.Error> {
		let currentValue: any = value;
		let root: Validatueur.Optional<Validatueur.ValidatorWrapper<
			any,
			any
		>> = this.__getFirst();

		while (!isNone(root)) {
			// iterate through rules
			const wrapper = root as Validatueur.ValidatorWrapper<any, any>;

			const { args, rule } = wrapper;
			const messageField = `${field}.${rule}`;
			const message =
				messageField in schema.messages
					? schema.messages[messageField]
					: "";

			const result = await wrapper.validator().validate(
				currentValue,
				{
					args,
					field,
					message,
				},
				schema
			);

			currentValue = result as any;
			root = wrapper.child;
		}

		return currentValue;
	}
}

export const ruleExists = (name: string) => name in RuleChain.prototype;

export type RuleExtension<T = any, U = T> = (
	...args: any[]
) => Validatueur.Extended<RuleChain<T, U>>;

export const registerExtensionRule = <T, U>(
	name: string,
	fn: RuleExtension<T, U>
) => {
	if (ruleExists(name))
		throw new ReferenceError(`Tried to redefine rule "${name}"`);

	RuleChain.prototype[name] = function (
		...args: any[]
	): Validatueur.Extended<RuleChain<T, U>> {
		const child = fn(...args);
		this.__getLast().child = child.__getFirst();
		child.__getFirst().parent = this.__getLast();
		return child;
	};
};

export const extendRules = <T = any, U = T>(
	name: string,
	fn: (...args: any[]) => Validatueur.ValidatorWrapper<T, U>
) => {
	return registerExtensionRule(name, function (...args: any[]) {
		const wrapper = fn(...args);
		return new RuleChain<T, U>(wrapper);
	});
};

/**
 * @returns {}
 */
export const rules = <T = any>(): Validatueur.Extended<RuleChain<T>> => {
	return new RuleChain<T>(noop<T>());
};
