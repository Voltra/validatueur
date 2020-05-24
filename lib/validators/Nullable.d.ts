import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
import { RuleChain } from "../rules";
export declare class Nullable<T = any> extends AbstractValidator<T | null> {
    get rule(): string;
    protected __validate(field: string, value: T | null, schema: Validatueur.Schema, rules: RuleChain<T>): Validatueur.Promise<T | null>;
}
