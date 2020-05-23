import { AbstractValidator, registerValidator } from "./AbstractValidator";
import { AnyOfRules } from "./AnyOfRules";
import { HasDigit } from "./HasDigit";
import { HasLowercaseLetter } from "./HasLowercaseLetter";
import { HasSpecialCharacter } from "./HasSpecialCharacter";
import { HasUppercaseLetter } from "./HasUppercaseLetter";
import { Max } from "./Max";
import { MaxLength } from "./MaxLength";
import { Min } from "./Min";
import { MinLength } from "./MinLength";
import { NotNaN } from "./NotNaN";
import { Nullable } from "./Nullable";
import { Regex } from "./Regex";
import { Required } from "./Required";
import { SameAs } from "./SameAs";
import { registerExtensionRule, rules } from "../rules";
import { Validatueur } from "../api/index";

export interface BetweenArgs{
	start: number,
	end: number,
	endExclusive: boolean|undefined,
	startExclusive: boolean|undefined,
}

export interface PasswordArgs extends BetweenArgs{
	min: number,
	max: number,
	endExclusive: boolean,
	startExclusive: boolean,
	useMax: boolean,
}

/****************************************************************************\
 * Generic
\****************************************************************************/
// nullable()
registerValidator(new Nullable<any>());

// required()
registerValidator(new Required());

// sameAs(fieldName)
registerValidator(new SameAs());

// anyOfRules(...ruleChains)
registerValidator(new AnyOfRules());

/****************************************************************************\
 * Numbers
\****************************************************************************/
// max(n, exclusive=true)
registerValidator(new Max<number>());

// min(n, exclusive=false)
registerValidator(new Min<number>());

/*
	between({
		start,
		end,
		endExclusive=true,
		startExclusive=false,
	})
*/
registerExtensionRule(
	"between",
	({
		start,
		end,
		endExclusive = true,
		startExclusive = false
	}: BetweenArgs) => {
		return rules<number>()
			.min(start, startExclusive)
			.max(end, endExclusive);
	}
);

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
		startExclusive = false
	}: BetweenArgs) => {
		return rules<string>()
			.minLength(start, startExclusive)
			.maxLength(end, endExclusive);
	}
);

// regex(pattern, fullMatch=true)
registerValidator(new Regex<string>());

// hasUppercaseLetter()
registerValidator(new HasUppercaseLetter<string>());

// hasLowercaseLetter()
registerValidator(new HasLowercaseLetter<string>());

// hasDigit()
registerValidator(new HasDigit<string>());

// hasSpecialCharacter()
registerValidator(new HasSpecialCharacter<string>());

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
					.minLength(min, startExclusive)

		return useMax ? chain.maxLength(max, endExclusive) : chain;
	}
);


export {
	AbstractValidator,
	registerValidator,
}
