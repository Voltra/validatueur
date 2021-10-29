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

export interface DateBetweenArgs {
	startExcluded: boolean;
	endExcluded: boolean;
	unit: moment.unitOfTime.StartOf;
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
registerValidator(new Nullable());

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
registerExtensionRule("doesNotSatisfy", function <T = unknown>(
	this: RuleChain<T>,
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
registerExtensionRule("oneOf", function <T = unknown>(
	this: RuleChain<T>,
	values: T[]
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
registerExtensionRule("notIn", function <T = unknown>(
	this: RuleChain<T>,
	values: T[]
) {
	return this.satisfies((value: T) => !contains(values, value));
});

registerExtensionRule("is", function <T = unknown>(
	this: RuleChain<T>,
	expected: T
) {
	return this.satisfies((value: T) => value === expected);
});

registerExtensionRule("isNot", function <T = unknown>(
	this: RuleChain<T>,
	expected: unknown
) {
	return this.satisfies((value: T) => value !== expected);
});

registerExtensionRule("lessThan", function(
	this: RuleChain<number>,
	max: number
) {
	return this.satisfies((value: number) => value < max);
});

registerExtensionRule("lessThanOrEqualTo", function(
	this: RuleChain<number>,
	max: number
) {
	return this.satisfies((value: number) => value <= max);
});

registerExtensionRule("greaterThan", function (
	this: RuleChain<number>,
	min: number
) {
	return this.satisfies((value: number) => value > min);
});

registerExtensionRule("greaterThanOrEqualTo", function (
	this: RuleChain<number>,
	min: number
) {
	return this.satisfies((value: number) => value >= min);
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
registerExtensionRule("max", function (
	this: RuleChain<number>,
	max: number,
	{ exclusive = true, step = undefined }: MinMaxArgs
) {
	return this.satisfies((value: number) => {
		const modCheck = isNone(step) ? true : !((max - value) % step);
		return modCheck && (exclusive ? value < max : value <= max);
	});
});

// min(n, exclusive=false)
/*
Ex:
	{
		amount: rules().min(minPerBuy)
	}
*/
registerExtensionRule("min", function(
	this: RuleChain<number>,
	min: number,
	{ exclusive = false, step = undefined }: MinMaxArgs
) {
	//TODO: Double check in tests if steps & exclusion semantics work properly
	return this.satisfies((value: number) => {
		const modCheck = isNone(step) ? true : !((value - min) % step);
		return modCheck && (exclusive ? value > min : value >= min);
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
registerExtensionRule("between", function(
	this: RuleChain<number>,
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
registerExtensionRule("withinAnyRange", function(
	this: RuleChain<number>,
	ranges: BetweenArgs[]
) {
	return this.anyOfRules(
		ranges.map((range: BetweenArgs) => {
			return this.between(range);
		})
	);
});

// notNaN()
registerValidator(new NotNaN());

/****************************************************************************\
 * Strings
\****************************************************************************/
// maxLength(n, exclusive=true)
registerExtensionRule("maxLength", function(
	this: RuleChain<string>,
	max: number,
	exclusive: boolean = true
) {
	return this.satisfies((value: string) => {
		return exclusive ? value.length < max : value.length <= max;
	});
});

// minLength(n, exclusive=false)
registerExtensionRule("minLength", function(
	this: RuleChain<string>,
	min: number,
	exclusive: boolean = false
) {
	return this.satisfies((value: string) => {
		return exclusive ? value.length >= min : value.length >= min;
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
registerExtensionRule("lengthBetween", function(
	this: RuleChain<string>,
	{
		start,
		end,
		endExclusive = true,
		startExclusive = false,
		useEnd = true,
	}: BetweenArgs
) {
	const min = this.minLength(start, startExclusive);
	return useEnd ? min.maxLength(end as number, endExclusive) : min;
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
registerExtensionRule("lengthInAnyRange", function(
	this: RuleChain<string>,
	ranges: BetweenArgs[]
) {
	return this.anyOfRules(
		ranges.map((range: BetweenArgs) => {
			return this.lengthBetween(range);
		})
	);
});

// regex(pattern, fullMatch=true)
registerExtensionRule("regex", function(
	this: RuleChain<string>,
	pattern: RegExp,
	fullMatch: boolean = true
) {
	return this.satisfies((value: string) => {
		return fullMatch ? pattern.test(value) : !!value.match(pattern);
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
	registerExtensionRule(name, function(
		this: RuleChain<string>
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
registerRegexRule(
	"hasLowercaseLetter",
	() => RegularExpressions.lowercaseLetter
);

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
registerExtensionRule("password", function(
	this: RuleChain<string>,
	{
		min = 8,
		max = 60,
		endExclusive = true,
		startExclusive = false,
		useMax = true,
	}: Partial<PasswordArgs> = {}
): RuleChain<string> {
	const chain = this.hasUppercaseLetter()
		.hasLowercaseLetter()
		.hasDigit()
		.hasSpecialCharacter()
		.minLength(min, startExclusive);

	return useMax ? chain.maxLength(max, endExclusive) : chain;
});

// startsWith(prefix)
registerExtensionRule("startsWith", function(
	this: RuleChain<string>,
	start: string
): RuleChain<string> {
	return this.satisfies((value: string) => value.startsWith(start));
});

// doesNotStartWith(prefix)
registerExtensionRule("doesNotStartWith", function(
	this: RuleChain<string>,
	start: string
): RuleChain<string> {
	return this.satisfies((value: string) => value.startsWith(start));
});

// endsWith(suffix)
registerExtensionRule("endsWith", function(
	this: RuleChain<string>,
	end: string
) {
	return this.satisfies((value: string) => value.endsWith(end));
});

// doesNotEndWith(suffix)
registerExtensionRule("doesNotEndWith", function(
	this: RuleChain<string>,
	end: string
) {
	return this.satisfies((value: string) => !value.endsWith(end));
});

// contains(needle)
registerExtensionRule("contains", function(
	this: RuleChain<string>,
	substr: string
) {
	return this.satisfies((value: string) => value.includes(substr));
});

// doesNotContain(needle)
registerExtensionRule("doesNotContain", function(
	this: RuleChain<string>,
	substr: string
) {
	return this.satisfies((value: string) => !value.includes(substr));
});

/****************************************************************************\
 * Dates
\****************************************************************************/
registerExtensionRule("after", function(
	this: RuleChain<moment.MomentInput>,
	min: moment.MomentInput,
	format?: moment.MomentFormatSpecification
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: moment.MomentInput) => {
		return asDate(value, format).isAfter(minDate);
	});
});

registerExtensionRule("before", function(
	this: RuleChain<moment.MomentInput>,
	max: moment.MomentInput,
	format?: moment.MomentFormatSpecification
) {
	const maxDate = asDate(max, format);
	return this.satisfies((value: moment.MomentInput) => {
		return asDate(value, format).isBefore(maxDate);
	});
});

registerExtensionRule("sameOrAfter", function(
	this: RuleChain<moment.MomentInput>,
	min: moment.MomentInput,
	format?: moment.MomentFormatSpecification
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: moment.MomentInput) => {
		return asDate(value, format).isSameOrAfter(minDate);
	});
});

registerExtensionRule("sameOrBefore", function(
	this: RuleChain<moment.MomentInput>,
	min: moment.MomentInput,
	format?: moment.MomentFormatSpecification
) {
	const minDate = asDate(min, format);
	return this.satisfies((value: moment.MomentInput) => {
		return asDate(value, format).isSameOrBefore(minDate);
	});
});

registerExtensionRule("dateBetween", function(
	this: RuleChain<moment.MomentInput>,
	min: moment.MomentInput,
	max: moment.MomentInput,
	{ startExcluded = false, endExcluded = true, unit = undefined }: Partial<DateBetweenArgs> = {},
	format?: moment.MomentFormatSpecification
) {
	const minDate = asDate(min, format);
	const maxDate = asDate(max, format);
	const boundFmt = (() => {
		if (startExcluded && endExcluded) return "()" as const;
		else if (startExcluded) return "(]" as const;
		else if (endExcluded) return "[)" as const;
		else return "[]" as const;
	})();

	return this.satisfies((value: moment.MomentInput) => {
		return asDate(value, format).isBetween(
			minDate,
			maxDate,
			unit,
			boundFmt
		);
	});
});

registerExtensionRule("onLeapYear", function(
	this: RuleChain<moment.MomentInput>,
	format?: moment.MomentFormatSpecification
) {
	return this.satisfies((value: moment.MomentInput) => {
		return asDate(value, format).isLeapYear();
	});
});

registerExtensionRule("beforeOffsetOf", function <T = Date>(
	this: RuleChain<T>,
	amount?: moment.DurationInputArg1,
	unit?: moment.DurationInputArg2,
	format?: moment.MomentFormatSpecification
) {
	const now_ = now();
	const max = now_.clone().add(amount, unit);
	return this.dateBetween(now_, max, {}, format);
});

registerExtensionRule("afterOffsetOf", function <T = Date, U = unknown>(
	this: RuleChain<T, U>,
	amount?: moment.DurationInputArg1,
	unit?: moment.DurationInputArg2,
	format?: string
) {
	const min = now().add(amount, unit);
	return this.sameOrAfter(min, format);
});

export { AbstractValidator, registerValidator };
