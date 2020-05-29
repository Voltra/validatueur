import { Error, isError } from "../../src/api/Error"

const field = "my-field";
const message = "my error message";
const rule = "my-rule";

describe("isError", function(){
	it("is true with an object that implements Error", function(){
		const error: Error = {
			field: "my-field",
			message: "my error message",
			rule: "my-rule",
		};

		expect(isError(error)).toBeTruthy();
	});

	it("is false on partial", function(){
		[{
			field,
		}, {
			message,
		}, {
			rule,
		}, {
			field,
			message,
		}, {
			field,
			rule,
		}, {
			message,
			rule,
		}].forEach(partial => expect(isError(partial)).toBeFalsy());
	});

	it("is false on random values", function(){
		return [
			42,
			null,
			NaN,
			undefined,
			false,
			true,
			-69.420,
			{},
			[],
		].forEach(value => expect(isError(value)).toBeFalsy());
	});
});