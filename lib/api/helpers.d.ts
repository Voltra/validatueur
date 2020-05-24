import { Extended } from "./types";
import { ValidatorArgs, FormatArgs } from "./ValidatorArgs";
import { Error } from "./Error";
import { Sanitizer } from "./Sanitizer";
import { Validator } from "./Validator";
/**
 * Create an error object from the validation and formatting arguments
 * @param args - The validation arguments
 * @param fmtArgs - The formatting arguments
 */
export declare const errorFrom: (args: ValidatorArgs, fmtArgs: Extended<FormatArgs>) => Error;
/**
 * Wrap a sanitizer into a function that generates validators
 * @param rule - The name of the sanitization rule
 * @param sanitizer - The sanitizer to wrap
 */
export declare const sanitizerWrapperGenerator: <T = any, U = T>(rule: string, sanitizer: Sanitizer<T, U>) => (...args: any[]) => {
    parent: undefined;
    child: undefined;
    args: any[];
    rule: string;
    validator(): Validator<T, U>;
};
