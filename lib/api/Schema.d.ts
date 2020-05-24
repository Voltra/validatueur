import { ValidatedSchema } from "./ValidatedSchema";
import { RuleChain } from "../rules";
import { Validatueur } from "./index";
import { Messages } from "./Messages";
export interface SchemaArgs {
    rules: Record<string, RuleChain>;
    messages: Messages;
}
export interface SchemaFieldValidationResult<T = any, U = T> {
    field: string;
    result: Validatueur.Result<U, Validatueur.Error>;
}
export declare class Schema {
    readonly ruleSet: Record<string, RuleChain>;
    readonly messages: Messages;
    static from({ rules, messages, }?: Partial<SchemaArgs>): Schema;
    includeExtra: boolean;
    protected constructor(ruleSet: Record<string, RuleChain>, messages: Messages);
    __validateField(field: string, value: any): Promise<SchemaFieldValidationResult>;
    validate(values: Record<string, any>, includeExtra?: boolean): Validatueur.Promise<ValidatedSchema>;
}
