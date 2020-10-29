import {AbstractValidator, registerValidator} from "@/validators/AbstractValidator"
import {Validatueur} from "../../src/api";
import Schema = Validatueur.Schema;
import {rules} from "../../src";

class TestValidator extends AbstractValidator{
	protected __validate(field: string, value: any, schema: Validatueur.Schema, args: any): Validatueur.Promise<any> {
		return Promise.resolve(undefined);
	}

	get rule(): string {
		return "testvalidator";
	}
}

//TODO: Add tests for RuleChain and all the registerValidator delegations

describe("registerValidator", function(){
	it("registers validation rules", function(){
		const validator = new TestValidator();
		registerValidator(validator);
		expect(rules()).toHaveProperty(validator.rule);
	});

	it("cannot override validation rules", function(){
		const test = () => {
			const validator = new TestValidator();
			registerValidator(validator);
			registerValidator(validator);
		};

		expect(test).toThrowError(ReferenceError);
	});
});
