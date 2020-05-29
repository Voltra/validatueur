import { Validatueur } from "../api";
import * as I from "./index";
import { RuleChain } from "../rules";
import { MinMaxArgs } from "./index";
import { BetweenArgs } from "./index";

export {};

declare global {
	class RuleChain<T, U> {
		/****************************************************************************\
		 * Generic
		\****************************************************************************/
		/**
		 * Either be null or validate the given chain
		 * @param chain - The chain to validate if not null
		 */
		public nullable<A, B = A>(
			this: Validatueur.Extended<RuleChain<A | null, B>>,
			chain: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<B | null, any>>;

		/**
		 * Fail if no value
		 */
		public required<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is the same as the other field
		 * @param otherField - The name of the other field (to lookup in the schema)
		 */
		public sameAs<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			otherField: string
		): Validatueur.Extended<RuleChain<A, any>>;

		/**
		 * Validate any of the given chains
		 * @param chains - The validation chains to validate any of
		 */
		public anyOf<A, B = A>(
			this: Validatueur.Validatueur.Extended<RuleChain<A, B>>,
			chains: RuleChain[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Validate an array using the given chain on each element
		 * @param chain - The chain to use to validate each element
		 */
		public arrayOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			chain: RuleChain
		): Validatueur.Extended<RuleChain>;

		/**
		 * Validate an object using the given schema
		 * @param shape - The schema to use to validate the object
		 */
		public objectOfShape<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			shape: Validatueur.Schema
		): Validatueur.Extended<RuleChain>;

		/**
		 * Check if the value satisfies the given predicate
		 * @param predicate - The predicate to satisfy
		 */
		public satisfies<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			predicate: (value: A) => boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Check if the value does not satisfy the given prediate
		 * @param predicate - The predicate to not satisfy
		 */
		public doesNotSatisfy<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			predicate: (value: A) => boolean
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is one of the provided values (uses ===)
		 * @param values - The finite set of values the value can take
		 */
		public oneOf<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			values: any[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Assert that the value is not one of the provided values
		 * @param values - The finite set of values the value cannot take
		 */
		public notIn<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			values: any[]
		): Validatueur.Extended<RuleChain>;

		/**
		 * Assert that the value is the expected value
		 * @param expected - The expected value
		 */
		public is<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is different from the expected value
		 * @param expected - The expected value
		 */
		public isNot<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is less than the expected value
		 * @param expected - The expected value
		 */
		public lessThan<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is less than or equal to the expected value
		 * @param expected - The expected value
		 */
		public lessThanOrEqualTo<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is greater than the expected value
		 * @param expected - The expected value
		 */
		public greaterThan<A, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			expected: any
		): Validatueur.Extended<RuleChain<A, B>>;

		/**
		 * Assert that the value is greater than or equal to the expected value
		 * @param expected - The expected value
		 */
		public greaterThanOrEqualTo<A, B = A>(
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
		public max<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			max: number,
			{ exclusive = true, step = undefined }: I.MinMaxArgs
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value does not exceed max
		 * @param min - The minimum value
		 * @param options
		 * @param [options.exclusive = false] - Whether or not to exclude min
		 * @param [options.step = undefined] - The steps of allowed values (like a ruler) (default is no steps)
		 */
		public min<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			min: number,
			{ exclusive = false, step = undefined }: I.MinMaxArgs
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
		public between<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			{
				start,
				end = undefined,
				endExclusive = true,
				startExclusive = false,
				step = undefined,
				useEnd = true,
			}: I.BetweenArgs
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is within one of the ranges
		 * @param ranges - The ranges to check against
		 */
		public withinAnyRange<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>,
			ranges: BetweenArgs[]
		): Validatueur.Extended<RuleChain<number>>;

		/**
		 * Assert that the value is not NaN
		 */
		public notNaN<A = number, B = A>(
			this: Validatueur.Extended<RuleChain<A, B>>
		): Validatueur.Extended<RuleChain<A, B>>;

		/****************************************************************************\
		 * Strings
		\****************************************************************************/
	}
}
