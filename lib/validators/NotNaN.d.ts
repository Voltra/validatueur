import { AbstractValidator } from "./AbstractValidator";
import { Validatueur } from "../api/index";
export declare class NotNaN<T = number> extends AbstractValidator<T, number> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Validatueur.Schema, ...args: any[]): Validatueur.Promise<number>;
}
