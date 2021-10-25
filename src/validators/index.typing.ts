import { Validatueur } from "../api";
import { RuleChain } from "../rules";
import * as I from "./index";

declare module "../rules" {
	interface RuleChain {
		/****************************************************************************\
		 * Generic
		\****************************************************************************/
		/**
		 * Either be null or validate the given chain
		 * @param chain - The chain to validate if not null
		 * @asMemberOf RuleChain
		 */
		nullable<T, U = T>(
			this: RuleChain<T | null>,
			chain: RuleChain<T, U>
		): RuleChain<U | null>;

		/**
		 * Fail if no value
		 * @asMemberOf RuleChain
		 */
		required<T = unknown>(
			this: RuleChain<T>
		): RuleChain<T>;

		/**
		 * Assert that the value is the same as the other field
		 * @param otherField - The name of the other field (to lookup in the schema)
		 * @asMemberOf RuleChain
		 */
		sameAs<T = unknown>(
			this: RuleChain<T>,
			otherField: string
		): RuleChain<T>;

		/**
		 * Validate any of the given chains
		 * @param chains - The validation chains to validate any of
		 * @asMemberOf RuleChain
		 */
		anyOf<T, U = T, A = unknown, B = A>(
			this: RuleChain<T, U>,
			chains: RuleChain<A, B>[]
		): RuleChain<A, B>;

		/**
		 * Validate an array using the given chain on each element
		 * @param chain - The chain to use to validate each element
		 * @asMemberOf RuleChain
		 */
		arrayOf<T, U = T>(
			this: RuleChain<T[]>,
			chain: RuleChain<T, U>
		): RuleChain<T[], U[]>;

		/**
		 * Validate an object using the given schema
		 * @param shape - The schema to use to validate the object
		 * @asMemberOf RuleChain
		 */
		objectOfShape<T extends Record<string, unknown>, Keys extends string = string, Values = unknown>(
			this: RuleChain<T>,
			shape: Validatueur.Schema<Keys, Values>
		): RuleChain<T, Record<Keys, Values>>;

		/**
		 * Check if the value satisfies the given predicate
		 * @param predicate - The predicate to satisfy
		 * @asMemberOf RuleChain
		 */
		satisfies<T>(
			this: RuleChain<T>,
			predicate: (value: T) => boolean
		): RuleChain<T>;

		/**
		 * Check if the value does not satisfy the given prediate
		 * @param predicate - The predicate to not satisfy
		 * @asMemberOf RuleChain
		 */
		doesNotSatisfy<T>(
			this: RuleChain<T>,
			predicate: (value: T) => boolean
		): RuleChain<T>;

		/**
		 * Assert that the value is one of the provided values (uses ===)
		 * @param values - The finite set of values the value can take
		 * @asMemberOf RuleChain
		 */
		oneOf<A, B = A>(
			this: RuleChain<A, B>,
			values: B[]
		): RuleChain<B>;

		/**
		 * Assert that the value is not one of the provided values
		 * @param values - The finite set of values the value cannot take
		 * @asMemberOf RuleChain
		 */
		notIn<A, B = A>(
			this: RuleChain<A, B>,
			values: B[]
		): RuleChain<B>;

		/**
		 * Assert that the value is the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		is<A, B = A>(
			this: RuleChain<A, B>,
			expected: B
		): RuleChain<B>;

		/**
		 * Assert that the value is different from the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		isNot<A, B = A>(
			this: RuleChain<A, B>,
			expected: B
		): RuleChain<B>;

		/****************************************************************************\
		 * Dates
		\****************************************************************************/
	}

	interface RuleChain {
		/****************************************************************************\
		 * Numbers
		\****************************************************************************/

		/**
		 * Assert that the value is less than the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		 lessThan(
			this: RuleChain<number>,
			expected: number
		): RuleChain<number>;

		/**
		 * Assert that the value is less than or equal to the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		lessThanOrEqualTo(
			this: RuleChain<number>,
			expected: number
		): RuleChain<number>;

		/**
		 * Assert that the value is greater than the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		greaterThan(
			this: RuleChain<number>,
			expected: number
		): RuleChain<number>;

		/**
		 * Assert that the value is greater than or equal to the expected value
		 * @param expected - The expected value
		 * @asMemberOf RuleChain
		 */
		greaterThanOrEqualTo(
			this: RuleChain<number>,
			expected: number
		): RuleChain<number>;

		/**
		 * Assert that the value does not exceed max
		 * @param max - The value to not exceed
		 * @param options
		 * @param [options.exclusive = true] - Whether or not to exclude max
		 * @param [options.step = undefined] - The steps of allowed values (like a ruler) (default is no steps)
		 * @asMemberOf RuleChain
		 */
		max(
			this: RuleChain<number>,
			max: number,
			options: I.MinMaxArgs
		): RuleChain<number>;

		/**
		 * Assert that the value does not exceed max
		 * @param min - The minimum value
		 * @param options
		 * @param [options.exclusive = false] - Whether or not to exclude min
		 * @param [options.step = undefined] - The steps of allowed values (like a ruler) (default is no steps)
		 * @asMemberOf RuleChain
		 */
		min(
			this: RuleChain<number>,
			min: number,
			options: I.MinMaxArgs
		): RuleChain<number>;

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
		between(
			this: RuleChain<number>,
			options: I.BetweenArgs
		): RuleChain<number>;

		/**
		 * Assert that the value is within one of the ranges
		 * @param ranges - The ranges to check against
		 * @asMemberOf RuleChain
		 */
		withinAnyRange(
			this: RuleChain<number>,
			ranges: I.BetweenArgs[]
		): RuleChain<number>;

		/**
		 * Assert that the value is not NaN
		 * @asMemberOf RuleChain
		 */
		notNaN(
			this: RuleChain<number>
		): RuleChain<number>;



		/****************************************************************************\
		 * Strings
		\****************************************************************************/

		/**
		 * Assert that the value's length does not exceed to given max value
		 * @param max - The maximum length
		 * @param [exclusive = true] - Whether or not to exclude the maximum length
		 * @asMemberOf RuleChain
		 */
		 maxLength(
			this: RuleChain<string>,
			max: number,
			exclusive?: boolean
		): RuleChain<string>;

		/**
		 * Assert that the value's length is at least the given min value
		 * @param min - The minimum length
		 * @param [exclusive = false] - Whether or not to exclude the minimum length
		 * @asMemberOf RuleChain
		 */
		minLength(
			this: RuleChain<string>,
			min: number,
			exclusive?: boolean
		): RuleChain<string>;

		/**
		 * Assert that the length is within the given range
		 * @param options
		 * @param options.start - The start of the range (minimum length)
		 * @param options.end - The end of the range (maximum length)
		 * @param [options.startExclusive = false] - Whether or not to exclude the start of the range
		 * @param [options.endExclusive = true] - Whether or not to exclude the end of the range
		 * @asMemberOf RuleChain
		 */
		lengthBetween(
			this: RuleChain<string>,
			options: I.BetweenArgs
		): RuleChain<string>;

		/**
		 * Assert that the length is within one of the given ranges
		 * @param ranges - The exhaustive list of ranges to check against
		 * @asMemberOf RuleChain
		 */
		lengthInAnyRange(
			this: RuleChain<string>,
			ranges: I.BetweenArgs[]
		): RuleChain<string>;

		/**
		 * Assert that the string matches the given pattern
		 * @param pattern - The regular expression to test against
		 * @param [fullMatch = true] - Whether it should match the entire string or not
		 * @asMemberOf RuleChain
		 */
		regex(
			this: RuleChain<string>,
			pattern: RegExp,
			fullMatch?: boolean
		): RuleChain<string>;

		/**
		 * Assert that the string contains an uppercase letter
		 * @asMemberOf RuleChain
		 */
		hasUppercaseLetter(
			this: RuleChain<string>
		): RuleChain<string>;

		/**
		 * Assert that the string contains a lowercase letter
		 * @asMemberOf RuleChain
		 */
		hasLowercaseLetter(
			this: RuleChain<string>
		): RuleChain<string>;

		/**
		 * Assert that the string contains a digit
		 * @asMemberOf RuleChain
		 */
		hasDigit(
			this: RuleChain<string>
		): RuleChain<string>;

		/**
		 * Assert that the string contains a special character
		 * @asMemberOf RuleChain
		 */
		hasSpecialCharacter(
			this: RuleChain<string>
		): RuleChain<string>;

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
		password(
			this: RuleChain<string>,
			options?: Partial<I.PasswordArgs>
		): RuleChain<string>;

		/**
		 * Assert that the string starts with the given prefix
		 * @param prefix - The prefix the string should start with
		 * @asMemberOf RuleChain
		 */
		startsWith(
			this: RuleChain<string>,
			prefix: string
		): RuleChain<string>;

		/**
		 * Assert that the string does not start with the given prefix
		 * @param prefix - The prefix the string should not start with
		 * @asMemberOf RuleChain
		 */
		doesNotStartWith(
			this: RuleChain<string>,
			prefix: string
		): RuleChain<string>;

		/**
		 * Assert that the string ends with the given suffix
		 * @param suffix - The suffix the string should end with
		 * @asMemberOf RuleChain
		 */
		endsWith(
			this: RuleChain<string>,
			suffix: string
		): RuleChain<string>;

		/**
		 * Assert that the string does not end with the given suffix
		 * @param suffix - The suffix the string should not end with
		 * @asMemberOf RuleChain
		 */
		doesNotEndWith(
			this: RuleChain<string>,
			suffix: string
		): RuleChain<string>;

		/**
		 * Assert that the string contains the given needle
		 * @param needle - The string to contain
		 * @asMemberOf RuleChain
		 */
		contains(
			this: RuleChain<string>,
			needle: string
		): RuleChain<string>;

		/**
		 * Assert that the string does not contain the given needle
		 * @param needle - The string to not contain
		 * @asMemberOf RuleChain
		 */
		doesNotContain(
			this: RuleChain<string>,
			needle: string
		): RuleChain<string>;
	}
}
