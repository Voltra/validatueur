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
		 */
		nullable<A, B = A>(
			this: Validatueur.Extended<RuleChain<A | null, B>>,
			chain: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<B | null, any>>;

		/**
		 * Fail if no value
		 */
		required<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is the same as the other field
		 * @param otherField - The name of the other field (to lookup in the schema)
		 */
		sameAs<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			otherField: string
		): Validatueur.Extended<RuleChain<A, any>>;

		/**
		 * Validate any of the given chains
		 * @param chains - The validation chains to validate any of
		 */
		anyOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			chains: RuleChain[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Validate an array using the given chain on each element
		 * @param chain - The chain to use to validate each element
		 */
		arrayOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			chain: RuleChain
		): Validatueur.Extended<RuleChain>;

		/**
		 * Validate an object using the given schema
		 * @param shape - The schema to use to validate the object
		 */
		objectOfShape<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			shape: Validatueur.Schema
		): Validatueur.Extended<RuleChain>;

		/**
		 * Check if the value satisfies the given predicate
		 * @param predicate - The predicate to satisfy
		 */
		satisfies<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			predicate: (value: A) => boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Check if the value does not satisfy the given prediate
		 * @param predicate - The predicate to not satisfy
		 */
		doesNotSatisfy<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			predicate: (value: A) => boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is one of the provided values (uses ===)
		 * @param values - The finite set of values the value can take
		 */
		oneOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			values: any[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Assert that the value is not one of the provided values
		 * @param values - The finite set of values the value cannot take
		 */
		notIn<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			values: any[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Assert that the value is the expected value
		 * @param expected - The expected value
		 */
		is<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is different from the expected value
		 * @param expected - The expected value
		 */
		isNot<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is less than the expected value
		 * @param expected - The expected value
		 */
		lessThan<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is less than or equal to the expected value
		 * @param expected - The expected value
		 */
		lessThanOrEqualTo<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is greater than the expected value
		 * @param expected - The expected value
		 */
		greaterThan<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is greater than or equal to the expected value
		 * @param expected - The expected value
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
		 */
		between<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			options: I.BetweenArgs
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is within one of the ranges
		 * @param ranges - The ranges to check against
		 */
		withinAnyRange<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			ranges: I.BetweenArgs[]
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is not NaN
		 */
		notNaN<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/****************************************************************************\
		 * Strings
		\****************************************************************************/

	}
}