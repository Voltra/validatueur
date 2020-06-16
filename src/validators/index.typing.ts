import { Validatueur } from "../api";
import { RuleChain } from "../rules";
import * as I from "./index";

declare module "../rules" {
	interface RuleChain<T, U> {
		/****************************************************************************\
		 * Generic
		\****************************************************************************/
		/**
		 * Either be null or validate the given chain
		 * @param chain - The chain to validate if not null
		 * @asMemberOf RuleChain
		 */
		nullable<A, B = A>(
			this: Validatueur.Extended<RuleChain<A | null, B>>,
			chain: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<B | null, any>>;

		/**
		 * Fail if no value
		 * @asMemberOf RuleChain
		 */
		required<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is the same as the other field
		 * @param otherField - The name of the other field (to lookup in the schema)
		 * @asMemberOf RuleChain
		 */
		sameAs<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			otherField: string
		): Validatueur.Extended<RuleChain<A, any>>;

		/**
		 * Validate any of the given chains
		 * @param chains - The validation chains to validate any of
		 * @asMemberOf RuleChain
		 */
		anyOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			chains: RuleChain[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Validate an array using the given chain on each element
		 * @param chain - The chain to use to validate each element
		 * @asMemberOf RuleChain
		 */
		arrayOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			chain: RuleChain
		): Validatueur.Extended<RuleChain>;

		/**
		 * Validate an object using the given schema
		 * @param shape - The schema to use to validate the object
		 * @asMemberOf RuleChain
		 */
		objectOfShape<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			shape: Validatueur.Schema
		): Validatueur.Extended<RuleChain>;

		/**
		 * Check if the value satisfies the given predicate
		 * @param predicate - The predicate to satisfy
		 * @asMemberOf RuleChain
		 */
		satisfies<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			predicate: (value: A) => boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Check if the value does not satisfy the given prediate
		 * @param predicate - The predicate to not satisfy
		 * @asMemberOf RuleChain
		 */
		doesNotSatisfy<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			predicate: (value: A) => boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is one of the provided values (uses ===)
		 * @param values - The finite set of values the value can take
		 * @asMemberOf RuleChain
		 */
		oneOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			values: any[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Assert that the value is not one of the provided values
		 * @param values - The finite set of values the value cannot take
		 * @asMemberOf RuleChain
		 */
		notIn<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			values: any[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Assert that the value is the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		is<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is different from the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		isNot<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is less than the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		lessThan<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is less than or equal to the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		lessThanOrEqualTo<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is greater than the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		greaterThan<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is greater than or equal to the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		greaterThanOrEqualTo<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/****************************************************************************\
		 * Numbers
		\****************************************************************************/
		/**
		 * Assert that the value does not exceed max
		 * @param max - The value to not exceed
		 * @param options
		 * @param [options.exclusive = true] - Whether or not to exclude max
		 * @param [options.step = undefined] - The steps of allowed values (like a ruler) (default is no steps)
		 * @asMemberOf RuleChain
		 */
		max<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			max: number,
			options: I.MinMaxArgs
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value does not exceed max
		 * @param min - The minimum value
		 * @param options
		 * @param [options.exclusive = false] - Whether or not to exclude min
		 * @param [options.step = undefined] - The steps of allowed values (like a ruler) (default is no steps)
		 * @asMemberOf RuleChain
		 */
		min<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			min: number,
			options: I.MinMaxArgs
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is within a given range
		 * @param options
		 * @param options.start - The start of the range
		 * @param options.end - The end of the range
		 * @param [options.endExclusive = true] - Whether or not to exclude the end of the range
		 * @param [options.startExclusive = false] - Whether or not to exclude the start of the range
		 * @param [options.step = undefined] - The step to use (default is no steps)
		 * @param [options.useEnd = true] - Whether or not to check for the end of the range
		 * @asMemberOf RuleChain
		 */
		between<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			options: I.BetweenArgs
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is within one of the ranges
		 * @param ranges - The ranges to check against
		 * @asMemberOf RuleChain
		 */
		withinAnyRange<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			ranges: I.BetweenArgs[]
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is not NaN
		 * @asMemberOf RuleChain
		 */
		notNaN<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/****************************************************************************\
		 * Strings
		\****************************************************************************/
		/**
		 * Assert that the value's length does not exceed to given max value
		 * @param max - The maximum length
		 * @param [exclusive = true] - Whether or not to exclude the maximum length
		 * @asMemberOf RuleChain
		 */
		maxLength<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			max: number,
			exclusive?: boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value's length is at least the given min value
		 * @param min - The minimum length
		 * @param [exclusive = false] - Whether or not to exclude the minimum length
		 * @asMemberOf RuleChain
		 */
		minLength<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			min: number,
			exclusive?: boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the length is within the given range
		 * @param options
		 * @param options.start - The start of the range (minimum length)
		 * @param options.end - The end of the range (maximum length)
		 * @param [options.startExclusive = false] - Whether or not to exclude the start of the range
		 * @param [options.endExclusive = true] - Whether or not to exclude the end of the range
		 * @asMemberOf RuleChain
		 */
		lengthBetween<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			options: I.BetweenArgs
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the length is within one of the given ranges
		 * @param ranges - The exhaustive list of ranges to check against
		 * @asMemberOf RuleChain
		 */
		lengthInAnyRange<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			ranges: I.BetweenArgs[]
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string matches the given pattern
		 * @param pattern - The regular expression to test against
		 * @param [fullMatch = true] - Whether it should match the entire string or not
		 * @asMemberOf RuleChain
		 */
		regex<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			pattern: RegExp,
			fullMatch?: boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string contains an uppercase letter
		 * @asMemberOf RuleChain
		 */
		hasUppercaseLetter<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string contains a lowercase letter
		 * @asMemberOf RuleChain
		 */
		hasLowercaseLetter<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string contains a digit
		 * @asMemberOf RuleChain
		 */
		hasDigit<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string contains a special character
		 * @asMemberOf RuleChain
		 */
		hasSpecialCharacter<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string is a decent password (8-100 characters, an uppercase letter, a lowercase letter, a digit and a special character)
		 * @param [options = {}]
		 * @param [options.min = 8]
		 * @param [options.max = 100]
		 * @param [options.endExclusive = true]
		 * @param [options.startExclusive = false]
		 * @param [options.useMax = true]
		 * @asMemberOf RuleChain
		 */
		password<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			options?: Partial<I.PasswordArgs>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string starts with the given prefix
		 * @param prefix - The prefix the string should start with
		 * @asMemberOf RuleChain
		 */
		startsWith<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			prefix: string
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string does not start with the given prefix
		 * @param prefix - The prefix the string should not start with
		 * @asMemberOf RuleChain
		 */
		doesNotStartWith<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			prefix: string
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string ends with the given suffix
		 * @param suffix - The suffix the string should end with
		 * @asMemberOf RuleChain
		 */
		endsWith<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			suffix: string
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string does not end with the given suffix
		 * @param suffix - The suffix the string should not end with
		 * @asMemberOf RuleChain
		 */
		doesNotEndWith<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			suffix: string
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string contains the given needle
		 * @param needle - The string to contain
		 * @asMemberOf RuleChain
		 */
		contains<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			needle: string
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the string does not contain the given needle
		 * @param needle - The string to not contain
		 * @asMemberOf RuleChain
		 */
		doesNotContain<A = string, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			needle: string
		): Validatueur.Extended<RuleChain<A, B>>;

		/****************************************************************************\
		 * Dates
		\****************************************************************************/
	}
}
