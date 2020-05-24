import { AbstractValidator } from "./index";
import { Validatueur } from "../api/index";
import { Schema } from "../api/Schema";
import { RuleChain } from "../rules";
export declare class ArrayOf<T = any> extends AbstractValidator<any[], T[]> {
    get rule(): string;
    protected __validate(field: string, values: any[], schema: Schema, rules: RuleChain<T>): Validatueur.Promise<T[]>;
}
