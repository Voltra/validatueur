import { AbstractValidator } from "./index";
import { Validatueur } from "../api/index";
import { Schema } from "../api/Schema";
import { contains } from "../utils";
import { noneIf } from "../api/types";

export class OneOf<T = any> extends AbstractValidator<T, any>{
	public get rule(): string {
		return "oneOf";
	}

	protected __validate(field: string, value: T, schema: Schema, args: any[]): Validatueur.Promise<any, any> {
		return noneIf(!contains(args, value), value);
	}
}