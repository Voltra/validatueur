import { AbstractValidator } from "./AbstractValidator";
import { Schema } from "../index";
import { Validatueur } from "../api/index";
export declare class Satisfies<T = any> extends AbstractValidator<T> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Schema, predicate: (value: T) => boolean): Validatueur.Promise<T>;
}
