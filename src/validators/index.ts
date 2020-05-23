import { AbstractValidator, registerValidator } from "./AbstractValidator";
import { AnyOfRules } from "./AnyOfRules";
import { ArrayOf } from "./ArrayOf";
import { Max } from "./Max";
import { MaxLength } from "./MaxLength";
import { Min } from "./Min";
import { MinLength } from "./MinLength";
import { NotNaN } from "./NotNaN";
import { Nullable } from "./Nullable";
import { ObjectOfShape } from "./ObjectOfShape";
import { Required } from "./Required";
import { SameAs } from "./SameAs";
import { Satisfies } from "./Satisfies";
import { registerExtensionRule, rules } from "../rules";
import { Validatueur } from "../api/index";
import { contains, RegularExpressions } from "../utils";

export interface BetweenArgs {
	start: number;
	end: number;
	endExclusive: boolean | undefined;
	startExclusive: boolean | undefined;
}

export interface PasswordArgs extends BetweenArgs {
	min: number;
	max: number;
	endExclusive: boolean;
	startExclusive: boolean;
	useMax: boolean;
}

/****************************************************************************\
 * Generic
\****************************************************************************/
// nullable(ruleChain)
/*
Ex:
	{
		url: rules().nullable(
			rules()
			.url()
		),
	}
*/
registerValidator(new Nullable<any>());

// required()
/*
Ex:
	{
		password: rules().required().password(),
	}
*/
registerValidator(new Required());

// sameAs(fieldName)
/*
Ex:
	{
		password: rules().required().password(),
		password_confirmation: rules().sameAs("password"),
	}
*/
registerValidator(new SameAs());

// anyOfRules(ruleChain[])
/*
Ex:
	{
		identifier: rules().anyOf([
			rules().username(),
			rules().email(),
			rules().integer().idFor({table: "users", field: "connect_id"}),
		]),
	}
*/
registerValidator(new AnyOfRules());

// arrayOf(ruleChain)
/*
Ex:
	{
		options: rules().arrayOf(
			rules()
			.oneOf([
				"hosting",
				"database",
				"hosting",
				"cloudflare"
			])
		),
	}
*/
registerValidator(new ArrayOf());

// objectOfShape(schema)
/*
Ex:
	{
		friendsInvited: rules().arrayOf(
			rules().objectOfShape(Schema.from({
				rules: {
					identifier: rules().integer().oneOfRules([
						rules().idFor({table: "users", field: "connect_id"}),
						rules().idFor({table: "anonymous", field: "code"}),
					]),
					inviteLink: rules().url().matchRoute("invitation.join"),
				},
				messages: {
					"identifier.integer": "The identifier must be an integer",
					"identifier.oneOfRules": "The identifier must exist",
					"inviteLink.url": "The invitation URL is invalid",
					"inviteLink.matchRoute": "The invitation URL must be of the correct format"
				},
			}))
		)
	}
*/
registerValidator(new ObjectOfShape());

// satisfies(predicate)
/*
Ex:
	{
		mod2: rules().satisfies(x => x%2 == 0),
	}
*/
registerValidator(new Satisfies());

// doesNotSatisfy(predicate)
/*
Ex:
	{
		mod2: rules().doesNotSatisfy(x => x%2),
	}
*/
registerExtensionRule(
	"doesNotSatisfy",
	<T = any>(predicate: (value: T) => boolean) => {
		return rules<T>().satisfies((value: T) => !predicate(value));
	}
);

// oneOf(values[])
/*
Ex:
	{
		amount: rules().oneOf([1, 2, 4, 10, 100]),
	}
*/
registerExtensionRule("oneOf", <T = any>(values: any[]) => {
	return rules<T>().satisfies((value: T) => contains(values, value));
});

// notIn(values[])
/*
Ex:
	{
		name: rules().identifier().notIn(reservedKeywords),
	}
*/
registerExtensionRule("notIn", <T = any>(values: any[]) => {
	return rules<T>().satisfies((value: T) => !contains(values, value));
});

registerExtensionRule("is", <T = any>(expected: any) => {
	return rules<T>().satisfies((value: T) => value === expected);
});

registerExtensionRule("isNot", <T = any>(expected: any) => {
	return rules<T>().satisfies((value: T) => value !== expected);
});

/****************************************************************************\
 * Numbers
\****************************************************************************/
// max(n, exclusive=true)
/*
Ex:
	{
		amount: rules().max(maxPerBuy, false)
	}
*/
registerValidator(new Max<number>());

// min(n, exclusive=false)
/*
Ex:
	{
		amount: rules().min(minPerBuy)
	}
*/
registerValidator(new Min<number>());

/*
	between({
		start,
		end,
		endExclusive=true,
		startExclusive=false,
	})
*/
/*
Ex:
	{
		amount: rules().between({
			start: minPerBuy,
			end: maxPerBuy,
			endExclusive: false,
		})
	}
*/
registerExtensionRule(
	"between",
	({
		start,
		end,
		endExclusive = true,
		startExclusive = false,
	}: BetweenArgs) => {
		return rules<number>()
			.min(start, startExclusive)
			.max(end, endExclusive);
	}
);

registerExtensionRule("lessThan", <T = any>(max: any) => {
	return rules<T>().satisfies((value: T) => value < max);
});

registerExtensionRule("lessThanOrEqualTo", <T = any>(max: any) => {
	return rules<T>().satisfies((value: T) => value <= max);
});

registerExtensionRule("greaterThan", <T = any>(min: any) => {
	return rules<T>().satisfies((value: T) => value > min);
});

registerExtensionRule("greaterThanOrEqualTo", <T = any>(min: any) => {
	return rules<T>().satisfies((value: T) => value >= min);
});

// notNaN()
registerValidator(new NotNaN<number>());

/****************************************************************************\
 * Strings
\****************************************************************************/
// maxLength(n, exclusive=true)
registerValidator(new MaxLength<string>());

// minLength(n, exclusive=false)
registerValidator(new MinLength<string>());

/*
	lengthBetween({
		start,
		end,
		endExclusive=true,
		startExclusive=false,
	})
*/
registerExtensionRule(
	"lengthBetween",
	({
		start,
		end,
		endExclusive = true,
		startExclusive = false,
	}: BetweenArgs) => {
		return rules<string>()
			.minLength(start, startExclusive)
			.maxLength(end, endExclusive);
	}
);

// regex(pattern, fullMatch=true)
registerExtensionRule(
	"regex",
	<T = any>(pattern: RegExp, fullMatch: boolean = true) => {
		return rules<T>().satisfies((value: T) => {
			const str = `${value}`;
			const validates = fullMatch
				? pattern.test(str)
				: !!str.match(pattern);
			return Validatueur.noneIf(!validates, str);
		});
	}
);

export const registerRegexRule = (name: string, patternFactory: () => RegExp, fullMatch: boolean = false) => {
	registerExtensionRule(name, <T>() => {
		return rules<T>().regex(patternFactory(), fullMatch);
	})
};

// hasUppercaseLetter()
registerRegexRule("hasUppercaseLetter", () => RegularExpressions.uppercaseLetter);

// hasLowercaseLetter()
registerRegexRule("hasDigit", () => RegularExpressions.lowercaseLetter);

// hasDigit()
registerRegexRule("hasDigit", () => RegularExpressions.digit);

// hasSpecialCharacter()
registerRegexRule("hasSpecialCharacter", () => RegularExpressions.specialCharacter);

/*
	password({
		min=8,
		max=100,
		endExclusive=true,
		startExclusive=false,
		useMax=true,
	})
*/
registerExtensionRule(
	"password",
	({
		min = 8,
		max = 100,
		endExclusive = true,
		startExclusive = false,
		useMax = true,
	}: Partial<PasswordArgs> = {}) => {
		const chain = rules<string>()
			.hasUppercaseLetter()
			.hasLowercaseLetter()
			.hasNumber()
			.hasSpecialCharacter()
			.minLength(min, startExclusive);

		return useMax ? chain.maxLength(max, endExclusive) : chain;
	}
);

export { AbstractValidator, registerValidator };
