import { AbstractValidator, registerValidator } from "./AbstractValidator";
import { AnyOfRules } from "./AnyOfRules";
import { ArrayOf } from "./ArrayOf";
import { NotNaN } from "./NotNaN";
import { Nullable } from "./Nullable";
import { ObjectOfShape } from "./ObjectOfShape";
import { Required } from "./Required";
import { SameAs } from "./SameAs";
import { Satisfies } from "./Satisfies";
import { registerExtensionRule, rules } from "../rules";
import { Validatueur } from "../api/index";
import {
	contains,
	RegularExpressions,
	asNumber,
	asStr,
	asDate,
	moment,
	now,
	Moment,
} from "../utils";

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
registerExtensionRule(
	"max",
	<T = number>(max: number, exclusive: boolean = true) => {
		return rules<T>().satisfies((value: T) => {
			const nb = asNumber(value);
			return exclusive ? nb < max : nb <= max;
		});
	}
);

// min(n, exclusive=false)
/*
Ex:
	{
		amount: rules().min(minPerBuy)
	}
*/
registerExtensionRule(
	"min",
	<T = number>(min: number, exclusive: boolean = false) => {
		return rules<T>().satisfies((value: T) => {
			const nb = asNumber(value);
			return exclusive ? nb > min : nb >= min;
		});
	}
);

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
	<T = number>({
		start,
		end,
		endExclusive = true,
		startExclusive = false,
	}: BetweenArgs) => {
		return rules<T>().min(start, startExclusive).max(end, endExclusive);
	}
);

// notNaN()
registerValidator(new NotNaN<number>());

/****************************************************************************\
 * Strings
\****************************************************************************/
// maxLength(n, exclusive=true)
registerExtensionRule(
	"maxLength",
	<T = string>(max: number, exclusive: boolean = true) => {
		return rules<T>().satisfies((value: T) => {
			const str = asStr(value);
			return exclusive ? str.length < max : str.length <= max;
		});
	}
);

// minLength(n, exclusive=false)
registerExtensionRule(
	"maxLength",
	<T = string>(min: number, exclusive: boolean = false) => {
		return rules<T>().satisfies((value: T) => {
			const str = asStr(value);
			return exclusive ? str.length >= min : str.length >= min;
		});
	}
);

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
registerExtensionRule(
	"lengthBetween",
	<T = string>({
		start,
		end,
		endExclusive = true,
		startExclusive = false,
	}: BetweenArgs) => {
		return rules<T>()
			.minLength(start, startExclusive)
			.maxLength(end, endExclusive);
	}
);

// regex(pattern, fullMatch=true)
registerExtensionRule(
	"regex",
	<T = any>(pattern: RegExp, fullMatch: boolean = true) => {
		return rules<T>().satisfies((value: T) => {
			const str = asStr(value);
			return fullMatch ? pattern.test(str) : !!str.match(pattern);
		});
	}
);

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
	registerExtensionRule(name, <T>() => {
		return rules<T>().regex(patternFactory(), fullMatch);
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
registerExtensionRule(
	"password",
	<T = string>({
		min = 8,
		max = 100,
		endExclusive = true,
		startExclusive = false,
		useMax = true,
	}: Partial<PasswordArgs> = {}) => {
		const chain = rules<T>()
			.hasUppercaseLetter()
			.hasLowercaseLetter()
			.hasNumber()
			.hasSpecialCharacter()
			.minLength(min, startExclusive);

		return useMax ? chain.maxLength(max, endExclusive) : chain;
	}
);

registerExtensionRule("startsWith", <T = string>(start: string) => {
	return rules<T>().satisfies((value: T) => {
		const str = asStr(value);
		return str.startsWith(start);
	});
});

registerExtensionRule("endsWith", <T = string>(end: string) => {
	return rules<T>().satisfies((value: T) => {
		const str = asStr(value);
		return str.endsWith(end);
	});
});

registerExtensionRule("contains", <T = string>(substr: string) => {
	return rules<T>().satisfies((value: T) => {
		const str = asStr(value);
		return str.includes(substr);
	});
});

registerExtensionRule("doesNotContain", <T = string>(substr: string) => {
	return rules<T>().satisfies((value: T) => {
		const str = asStr(value);
		return !str.includes(substr);
	});
});

/****************************************************************************\
 * Dates
\****************************************************************************/
registerExtensionRule("after", <T = Date>(min: any, format?: string) => {
	const minDate = asDate(min, format);
	return rules<T>().satisfies((value: T) => {
		return asDate(value, format).isAfter(minDate);
	});
});

registerExtensionRule("before", <T = Date>(min: any, format?: string) => {
	const minDate = asDate(min, format);
	return rules<T>().satisfies((value: T) => {
		return asDate(value, format).isBefore(minDate);
	});
});

registerExtensionRule("sameOrAfter", <T = Date>(min: any, format?: string) => {
	const minDate = asDate(min, format);
	return rules<T>().satisfies((value: T) => {
		return asDate(value, format).isSameOrAfter(minDate);
	});
});

registerExtensionRule("sameOrBefore", <T = Date>(min: any, format?: string) => {
	const minDate = asDate(min, format);
	return rules<T>().satisfies((value: T) => {
		return asDate(value, format).isSameOrBefore(minDate);
	});
});

registerExtensionRule(
	"dateBetween",
	<T = Date>(
		min: any,
		max: any,
		{ startExcluded = false, endExcluded = true, unit = undefined } = {},
		format?: string
	) => {
		const minDate = asDate(min, format);
		const maxDate = asDate(max, format);
		const boundFmt: "()" | "[)" | "(]" | "[]" = (() => {
			if(startExcluded && endExcluded)
				return "()";
			else if(startExcluded)
				return "(]";
			else if(endExcluded)
				return "[)";
			else
				return "[]";
		})();

		return rules<T>().satisfies((value: T) => {
			return asDate(value, format).isBetween(
				minDate,
				maxDate,
				unit,
				boundFmt
			);
		});
	}
);

registerExtensionRule("onLeapYear", <T = Date>(format?: string) => {
	return rules<T>().satisifes((value: T) => {
		return asDate(value, format).isLeapYear();
	});
});

registerExtensionRule(
	"beforeOffsetOf",
	<T = Date>(
		amount?: Moment.DurationInputArg1,
		unit?: Moment.DurationInputArg2,
		format?: string
	) => {
		const now_ = now();
		const max = now_.clone().add(amount, unit);
		return rules<T>().dateBetween(now_, max, {}, format);
	}
);

registerExtensionRule(
	"afterOffsetOf",
	<T = Date>(
		amount?: Moment.DurationInputArg1,
		unit?: Moment.DurationInputArg2,
		format?: string
	) => {
		const min = now().add(amount, unit);
		return rules<T>().sameOrAfter(min, format);
	}
);

export { AbstractValidator, registerValidator };
