import { AbstractValidator, registerValidator } from "./AbstractValidator";
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
/**
 * Register a regex dependent validation rule
 * @param name - The name of the validator method
 * @param patternFactory - The factory to the pattern to match
 * @param fullMatch - Whether or not the pattern should match the entire string
 */
export declare const registerRegexRule: (name: string, patternFactory: () => RegExp, fullMatch?: boolean) => void;
export { AbstractValidator, registerValidator };
