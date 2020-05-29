import { AbstractValidator, registerValidator } from "./AbstractValidator";
import { AnyOfRules } from "./AnyOfRules";
import { ArrayOf } from "./ArrayOf";
import { NotNaN } from "./NotNaN";
import { Nullable } from "./Nullable";
import { ObjectOfShape } from "./ObjectOfShape";
import { Required } from "./Required";
import { SameAs } from "./SameAs";
import { Satisfies } from "./Satisfies";
import { registerExtensionRule, RuleChain, rules } from "../rules";

import {
	contains,
	RegularExpressions,
	asNumber,
	asStr,
	asDate,
	now,
} from "../utils";
import moment from "moment";
import { Validatueur } from "../api";
import { isNone } from "../api/types";

export interface MinMaxArgs {
	exclusive?: boolean;
	step?: number;
}

export interface BetweenArgs {
	start: number;
	end?: number;
	endExclusive?: boolean;
	startExclusive?: boolean;
	step?: number;
	useEnd?: boolean;
}

export interface PasswordArgs {
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
registerExtensionRule("doesNotSatisfy", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	predicate: (value: T) => boolean
) {
	return this.satisfies((value: T) => !predicate(value));
});

// oneOf(values[])
/*
Ex:
	{
		amount: rules().oneOf([1, 2, 4, 10, 100]),
	}
*/
registerExtensionRule("oneOf", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	values: any[]
) {
	return this.satisfies((value: T) => contains(values, value));
});

// notIn(values[])
/*
Ex:
	{
		name: rules().identifier().notIn(reservedKeywords),
	}
*/
registerExtensionRule("notIn", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	values: any[]
) {
	return this.satisfies((value: T) => !contains(values, value));
});

registerExtensionRule("is", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	expected: any
) {
	return this.satisfies((value: T) => value === expected);
});

registerExtensionRule("isNot", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	expected: any
) {
	return this.satisfies((value: T) => value !== expected);
});

registerExtensionRule("lessThan", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	max: any
) {
	return this.satisfies((value: T) => value < max);
});

registerExtensionRule("lessThanOrEqualTo", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	max: any
) {
	return this.satisfies((value: T) => value <= max);
});

registerExtensionRule("greaterThan", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any
) {
	return this.satisfies((value: T) => value > min);
});

registerExtensionRule("greaterThanOrEqualTo", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any
) {
	return this.satisfies((value: T) => value >= min);
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
registerExtensionRule("max", function <T = number, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	max: number,
	{ exclusive = true, step = undefined }: MinMaxArgs
) {
	return this.satisfies((value: T) => {
		const nb = asNumber(value);
		const modCheck = isNone(step) ? true : !((max - nb) % <number>step);
		return modCheck && (exclusive ? nb < max : nb <= max);
	});
});

// min(n, exclusive=false)
/*
Ex:
	{
		amount: rules().min(minPerBuy)
	}
*/
registerExtensionRule("min", function <T = number, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: number,
	{ exclusive = false, step = undefined }: MinMaxArgs
) {
	//TODO: Double check in tests if steps & exclusion semantics work properly
	return this.satisfies((value: T) => {
		const nb = asNumber(value);
		const modCheck = isNone(step) ? true : !((nb - min) % <number>step);
		return modCheck && (exclusive ? nb > min : nb >= min);
	});
});

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
registerExtensionRule("between", function <T = number, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	{
		start,
		end = undefined,
		endExclusive = true,
		startExclusive = false,
		step = undefined,
		useEnd = true,
	}: BetweenArgs
) {
	const min = this.min(start, {
		exclusive: startExclusive,
		step,
	});

	// warning bellow (on max's arguments) is due to wrong type deduction
	return useEnd
		? min.max(end as number, {
				exclusive: endExclusive,
				step,
		  })
		: min;
});

/*
	withinAnyRange(ranges)
*/
/*
Ex:
	{
		angle: rules().withinAnyRange([{
			start: 1,
			end: 4,
		}, {
			start: 10,
			end: 33,
		}, {
			start: 45,
			useMax: false,
		}]),
	}
 */
registerExtensionRule("withinAnyRange", function <T = number, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	ranges: BetweenArgs[]
) {
	return this.anyOfRules(
		ranges.map((range: BetweenArgs) => {
			return this.between(range);
		})
	);
});

// notNaN()
registerValidator(new NotNaN<number>());

/****************************************************************************\
 * Strings
\****************************************************************************/
// maxLength(n, exclusive=true)
registerExtensionRule("maxLength", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	max: number,
	exclusive: boolean = true
) {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return exclusive ? str.length < max : str.length <= max;
	});
});

// minLength(n, exclusive=false)
registerExtensionRule("minLength", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: number,
	exclusive: boolean = false
) {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return exclusive ? str.length >= min : str.length >= min;
	});
});

/*
	lengthBetween({
		start,
		end,
		endExclusive=true,
		startExclusive=false,
	})
*/
/*
Ex:
	{
		username: rules().lengthBetween({start: 6, end: 25}),
	}
*/
registerExtensionRule("lengthBetween", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	{ start, end, endExclusive = true, startExclusive = false }: BetweenArgs
) {
	return this.minLength(start, startExclusive).maxLength(end, endExclusive);
});

/*
	lengthInAnyRange(ranges)
*/
/*
Ex:
	{
		stuff: rules().lengthInAnyRange([{
			start: 1,
			end: 7,
		}, {
			start: 9,
			end: 15,
		}]),
	}
*/
registerExtensionRule("lengthInAnyRange", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	ranges: BetweenArgs[]
) {
	return this.anyOfRules(
		ranges.map((range: BetweenArgs) => {
			return this.lengthBetween(range);
		})
	);
});

// regex(pattern, fullMatch=true)
registerExtensionRule("regex", function <T = any, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	pattern: RegExp,
	fullMatch: boolean = true
) {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return fullMatch ? pattern.test(str) : !!str.match(pattern);
	});
});

/**
 * Register a regex dependent validation rule
 * @param name - The name of the validator method
 * @param patternFactory - The factory to the pattern to match
 * @param fullMatch - Whether or not the pattern should match the entire string
 */
export const registerRegexRule = (
	name: string,
	patternFactory: () => RegExp,
	fullMatch: boolean = false
) => {
	registerExtensionRule(name, function <T = string, U = T>(
		this: Validatueur.Extended<RuleChain<T, U>>
	) {
		return this.regex(patternFactory(), fullMatch);
	});
};

// hasUppercaseLetter()
registerRegexRule(
	"hasUppercaseLetter",
	() => RegularExpressions.uppercaseLetter
);

// hasLowercaseLetter()
registerRegexRule("hasDigit", () => RegularExpressions.lowercaseLetter);

// hasDigit()
registerRegexRule("hasDigit", () => RegularExpressions.digit);

// hasSpecialCharacter()
registerRegexRule(
	"hasSpecialCharacter",
	() => RegularExpressions.specialCharacter
);

/*
	password({
		min=8,
		max=100,
		endExclusive=true,
		startExclusive=false,
		useMax=true,
	})
*/
registerExtensionRule("password", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	{
		min = 8,
		max = 100,
		endExclusive = true,
		startExclusive = false,
		useMax = true,
	}: Partial<PasswordArgs> = {}
): RuleChain<string> {
	const chain = this.hasUppercaseLetter()
		.hasLowercaseLetter()
		.hasNumber()
		.hasSpecialCharacter()
		.minLength(min, startExclusive);

	return useMax ? chain.maxLength(max, endExclusive) : chain;
});

// startsWith(prefix)
registerExtensionRule("startsWith", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	start: string
): RuleChain<string> {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return str.startsWith(start);
	});
});

// endsWith(suffix)
registerExtensionRule("endsWith", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	end: string
) {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return str.endsWith(end);
	});
});

// contains(needle)
registerExtensionRule("contains", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	substr: string
) {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return str.includes(substr);
	});
});

// doesNotContain(needle)
registerExtensionRule("doesNotContain", function <T = string, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	substr: string
) {
	return this.satisfies((value: T) => {
		const str = asStr(value);
		return !str.includes(substr);
	});
});

/****************************************************************************\
 * Dates
\****************************************************************************/
registerExtensionRule("after", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any,
	format?: string
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: T) => {
		return asDate(value, format).isAfter(minDate);
	});
});

registerExtensionRule("before", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any,
	format?: string
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: T) => {
		return asDate(value, format).isBefore(minDate);
	});
});

registerExtensionRule("sameOrAfter", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any,
	format?: string
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: T) => {
		return asDate(value, format).isSameOrAfter(minDate);
	});
});

registerExtensionRule("sameOrBefore", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any,
	format?: string
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: T) => {
		return asDate(value, format).isSameOrBefore(minDate);
	});
});

registerExtensionRule("dateBetween", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	min: any,
	max: any,
	{ startExcluded = false, endExcluded = true, unit = undefined } = {},
	format?: string
) {
	const minDate = asDate(min, format);
	const maxDate = asDate(max, format);
	const boundFmt: "()" | "[)" | "(]" | "[]" = (() => {
		if (startExcluded && endExcluded) return "()";
		else if (startExcluded) return "(]";
		else if (endExcluded) return "[)";
		else return "[]";
	})();

	return this.satisfies((value: T) => {
		return asDate(value, format).isBetween(
			minDate,
			maxDate,
			unit,
			boundFmt
		);
	});
});

registerExtensionRule("onLeapYear", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	format?: string
) {
	return this.satisifes((value: T) => {
		return asDate(value, format).isLeapYear();
	});
});

registerExtensionRule("beforeOffsetOf", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	amount?: moment.DurationInputArg1,
	unit?: moment.DurationInputArg2,
	format?: string
) {
	const now_ = now();
	const max = now_.clone().add(amount, unit);
	return this.dateBetween(now_, max, {}, format);
});

registerExtensionRule("afterOffsetOf", function <T = Date, U = T>(
	this: Validatueur.Extended<RuleChain<T, U>>,
	amount?: moment.DurationInputArg1,
	unit?: moment.DurationInputArg2,
	format?: string
) {
	const min = now().add(amount, unit);
	return this.sameOrAfter(min, format);
});

export { AbstractValidator, registerValidator };
