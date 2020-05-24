import { Validatueur } from "../api/index";
import { AbstractValidator } from "./AbstractValidator";
export declare class Required<T = any> extends AbstractValidator<T> {
    get rule(): string;
    protected __validate(field: string, value: T, schema: Validatueur.Schema): Validatueur.Promise<T>;
}
