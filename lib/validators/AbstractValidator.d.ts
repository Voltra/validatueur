import { Validatueur } from "../api/index";
export declare abstract class AbstractValidator<T = any, U = T> implements Validatueur.Validator<T, U> {
    validate(value: T, args: Validatueur.ValidatorArgs, schema: Validatueur.Schema): Validatueur.Promise<U, Validatueur.Error>;
    abstract get rule(): string;
    protected abstract __validate(field: string, value: T, schema: Validatueur.Schema, ...args: any[]): Validatueur.Promise<U>;
}
export declare const registerValidator: <T = any, U = T>(validator: AbstractValidator<T, U>) => void;
