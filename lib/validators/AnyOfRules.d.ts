import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
import { RuleChain } from "../rules";
import { Validatueur } from "../api/index";
export declare class AnyOfRules<T = any, U = T> extends AbstractValidator<T, U> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Schema, ...chains: RuleChain[]): Validatueur.Promise<U>;
}
