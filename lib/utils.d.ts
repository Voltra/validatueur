import moment from "moment";
export declare const isEmpty: (str: string) => boolean;
export declare const asStr: <T>(value: T) => string;
export declare const isValue: <T>(value: T) => boolean;
export declare const trim: <T>(value: T) => string;
export declare const contains: <T>(values: any[], value: T) => boolean;
export declare const asNumber: <T>(value: T) => number;
export declare const asDate: <T = any>(value?: T | undefined, format?: import("./api/types").Optional<string>) => moment.Moment;
export declare const now: <T = any>() => moment.Moment;
export declare const RegularExpressions: {
    digit: RegExp;
    lowercaseLetter: RegExp;
    uppercaseLetter: RegExp;
    specialCharacter: RegExp;
};
export declare const Sanitizers: {
    __isNaN(value: number): boolean;
    number<T>(value: T): import("./api/types").ValidationPromise<number, undefined>;
    integer(value: any, base?: number): import("./api/types").ValidationPromise<number, undefined>;
    float(value: any): import("./api/types").ValidationPromise<number, undefined>;
    moment<T_1>(value: T_1, format?: import("./api/types").Optional<string>): import("./api/types").ValidationPromise<moment.Moment, undefined>;
    date<T_2>(value: T_2, format?: import("./api/types").Optional<string>): Promise<Date>;
    ago<T_3>(value: T_3, format?: import("./api/types").Optional<string>): Promise<string>;
    momentDisplay<T_4>(value: T_4, { parseFormat, displayFormat }?: {
        parseFormat?: undefined;
        displayFormat?: undefined;
    }): Promise<string>;
};
export { moment, };
