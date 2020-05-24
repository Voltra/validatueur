import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../api/Schema";
import { Validatueur } from "../api/index";
export declare class ObjectOfShape<T = any> extends AbstractValidator<T, Record<string, any>> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Schema, objectSchema: Schema): Validatueur.Promise<Record<string, any>>;
}
