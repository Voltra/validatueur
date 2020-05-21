import { Validatueur } from "./api/index";
import { isError } from "./api/Error";

const empty = <T>(): Validatueur.ValidatorWrapper<T> => {
	return {
		parent: Validatueur.none,
		child: Validatueur.none,
		args: [],
		rule: "",
		validator(): Validatueur.Validator<T>{
			return {
				validate(value: T, args: Validatueur.ValidatorArgs): Validatueur.Result<T, Validatueur.Error>{
					return value;
				}
			};
		},
	};
};

export class RuleChain<T = any, U = T>{
	public constructor(
		protected root: Validatueur.ValidatorWrapper<T, U>
	){
		if(this.root.parent !== Validatueur.none)
			throw new Error("Latest rule in the chain should not have a child");
	}

	validate(field: string, value: T, messages: Record<string, string>): Validatueur.Result<any, Validatueur.Error> {
		const { none } = Validatueur;
		let currentValue: any = value;
		let root: Validatueur.Optional<Validatueur.ValidatorWrapper<any, any>> = this.root;

		while(root !== none && root.parent !== none) // backtrack to first rule
			root = root.parent;


		while(root !== none){
			const { args, rule } = root;
			const messageField = `${field}.${rule}`;
			const message =
					messageField in messages
						? messages[messageField]
						: "";

			const result = root.validator().validate(value, {
				args,
				field,
				message,
			});

			if(isError(result))
				return result; // exit early on failure

			currentValue = result as any;
			root = root.child; // iterate through rules
		}

		return currentValue;
	}
}

export const ruleExists = (name: string) => name in RuleChain.prototype;

export const extendRules = <T = any, U = T>(name: string, fn: (...args: any[]) => Validatueur.ValidatorWrapper<T, U>) => {
	if(ruleExists(name))
		throw new ReferenceError(`Tried to redefine rule "${name}"`);

	RuleChain.prototype[name] = function(...args: any[]){
		const child = fn(...args);
		child.parent = this.root;
		this.root.child = child;
		return new RuleChain<T, U>(child);
	};
};

export const rules = <T = any>() => new RuleChain<T>(empty<T>());