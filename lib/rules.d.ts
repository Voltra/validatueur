import { Validatueur } from "./api/index";
export declare class RuleChain<T = any, U = T> {
    protected root: Validatueur.ValidatorWrapper<T, U>;
    constructor(root: Validatueur.ValidatorWrapper<T, U>);
    __getFirst<A = T, B = U>(): Validatueur.ValidatorWrapper<A, B>;
    __getLast<A = T, B = U>(): Validatueur.ValidatorWrapper<A, B>;
    __validate(field: string, value: T, schema: Validatueur.Schema): Validatueur.Promise<any, Validatueur.Error>;
}
export declare const ruleExists: (name: string) => boolean;
export declare type RuleExtension<T = any, U = T> = (...args: any[]) => Validatueur.Extended<RuleChain<T, U>>;
export declare const registerExtensionRule: <T, U>(name: string, fn: RuleExtension<T, U>) => void;
export declare const extendRules: <T = any, U = T>(name: string, fn: (...args: any[]) => Validatueur.ValidatorWrapper<T, U>) => void;
/**
 * @returns {}
 */
export declare const rules: <T = any>() => import("./api/types").Extended<RuleChain<T, T>>;
