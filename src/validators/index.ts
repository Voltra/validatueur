import { AbstractValidator, registerValidator } from "./AbstractValidator";
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
import { registerExtensionRule, rules } from "../rules";

/****************************************************************************\
 * Generic
\****************************************************************************/
// nullable()
registerValidator(new Nullable<any>());

// required()
registerValidator(new Required());

/****************************************************************************\
 * Numbers
\****************************************************************************/
// max(n, exclusive=true)
registerValidator(new Max<number>());

// min(n, exclusive=false)
registerValidator(new Min<number>());

registerExtensionRule(
	"between",
	(
		start: number,
		end: number,
		endExclusive: boolean = true,
		startExclusive: boolean = false
	) => {
		return rules().min(start, startExclusive).max(end, endExclusive);
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

registerExtensionRule(
	"lengthBetween",
	(
		start: number,
		end: number,
		endExclusive: boolean = true,
		startExclusive: boolean = false
	) => {
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

registerExtensionRule(
	"password",
	(
		min: number = 8,
		max: number = 100,
		endExclusive: boolean = true,
		startExclusive: boolean = false
	) => {
		return rules<string>()
			.minLength(min, startExclusive)
			.maxLength(max, endExclusive)
			.hasUppercaseLetter()
			.hasLowercaseLetter()
			.hasNumber()
			.hasSpecialCharacter();
	}
);

export * from "./AbstractValidator";
