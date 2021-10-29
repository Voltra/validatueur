import { Validatueur } from "./api/index";
import { isNone } from "./api/types";
import { getFirst, getLast } from "./api/helpers";

const noop = <T>(): Validatueur.ValidatorWrapper<T> => {
	const { none } = Validatueur;

	return {
		parent: none,
		child: none,
		args: [],
		rule: "",
		validator(): Validatueur.Validator<T> {
			return {
				shouldValidate<Keys extends string = string, Key extends Keys = Keys, Values = unknown>(
					value: T,
					args: Validatueur.ValidatorArgs<Key>,
					schema: Validatueur.Schema<Keys, Values>
				): boolean {
					return true;
				},
				validate<Keys extends string = string, Key extends Keys = Keys, Values = unknown>(
					value: T,
					_vargs: Validatueur.ValidatorArgs<Key>,
					_schema: Validatueur.Schema<Keys, Values>
				): Validatueur.Promise<T, Validatueur.Error<Key>> {
					return Promise.resolve(value);
				}
			};
		},
	};
};

export class RuleChain<T = unknown, U = T> {
	public constructor(protected root: Validatueur.ValidatorWrapper<T, U>) {}

	public __getFirst<B = U>(): Validatueur.ValidatorWrapper<T, B> {
		return getFirst<T, U, B>(this.root);
	}

	public __getLast<A = T>(): Validatueur.ValidatorWrapper<A, U> {
		return getLast<T, U, A>(this.root);
	}

	public async __validate<Keys extends string = string, Key extends Keys = Keys, Values = unknown>(
		field: Key,
		value: T,
		schema: Validatueur.Schema<Keys, Values>
	): Validatueur.Promise<U, Validatueur.Error<Key>> {
		let currentValue: unknown|T|U = value;
		let root = this.__getFirst() as Validatueur.Optional<
			Validatueur.ValidatorWrapper<
				unknown,
				unknown
			>
		>;

		while (!isNone(root)) {
			// iterate through rules
			const wrapper = root;

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

			currentValue = result as unknown;
			root = wrapper.child;
		}

		return currentValue as U;
	}
}

export const ruleExists = (name: string) => {
	return name in RuleChain.prototype
		&& typeof RuleChain.prototype[name] === "function";
};

/**
 * A rule extension is a rule that adds validation through the uses of other rules by binding or wrapping parameters
 */
export type RuleExtension<T = unknown, U = T, B = unknown> = (
	this: RuleChain<T, U>,
	...args: any[]
) => RuleChain<U, B>;

export const registerExtensionRule = <T = unknown, U = T, B = unknown>(
	name: string,
	fn: RuleExtension<T, U, B>
) => {
	if (ruleExists(name))
		throw new ReferenceError(`Tried to redefine rule "${name}"`);

	RuleChain.prototype[name] = function (
		this: RuleChain<T, U>,
		...args: unknown[]
	): RuleChain<U, B> {
		const child = fn.call(this, ...args);
		const childFirst = child.__getFirst();
		const thisLast = this.__getLast();
		thisLast.child = childFirst;
		childFirst.parent = thisLast;
		return child;
	};
};

export const extendRules = <A = unknown, T = A, U = unknown>(
	name: string,
	fn: (this: RuleChain<A, T>, ...args: unknown[]) => Validatueur.ValidatorWrapper<T, U>
) => {
	return registerExtensionRule(name, function (
		this: RuleChain<A, T>,
		...args: unknown[]
	) {
		const wrapper = fn.call(this, ...args);
		return new RuleChain<T, U>(wrapper);
	});
};

export const rules = <T = unknown>(): RuleChain<T> => {
	return new RuleChain(noop<T>());
};

export type Rules<Keys extends string = string, Values = unknown> = Record<Keys, RuleChain<unknown, Values>>;
