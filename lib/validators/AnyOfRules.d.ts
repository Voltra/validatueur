import { Validatueur } from "../api/index";
import { Schema } from "../api/Schema";
import { RuleChain } from "../rules";
import { AbstractValidator } from "./AbstractValidator";
export declare class AnyOfRules<T = any, U = T> extends AbstractValidator<T, U> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Schema, ...chains: RuleChain[]): Validatueur.Promise<U>;
}
