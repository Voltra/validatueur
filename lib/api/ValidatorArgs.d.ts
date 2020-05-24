export interface ValidatorArgs {
    args: any[];
    field: string;
    message: string;
}
export interface FormatArgs {
    rule: string;
}
export declare type Formatter = (obj: FormatArgs) => string;
