import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
export declare class SameAs<T = any> extends AbstractValidator<T, any> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Schema, otherField: string): Promise<import("../api/Schema").SchemaFieldValidationResult<any, any>>;
}
