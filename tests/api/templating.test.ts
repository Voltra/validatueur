import { precompile } from "@/api/templating";
import { FormatArgs } from "@/api/ValidatorArgs";

describe("precompile", function () {
	it("renders the given string if no formatting is given", function () {
		const fmt: FormatArgs = {
			rule: "test",
		};

		[
			"This is a very long test string to check everything",
			"lorem ipsum dolor sit amet",
		].forEach(message =>
			expect(
				precompile({
					args: [],
					field: "test",
					message,
				})(fmt)
			).toEqual(message)
		);
	});

	it("can use the arguments array", function () {
		const args = ["yolo", "patalo"];
		const message = "This is {args0} then {args1}";

		const render = precompile({
			args,
			message,
			field: "test",
		});

		expect(render({ rule: "test" })).toEqual(
			`This is ${args[0]} then ${args[1]}`
		);
	});

	it("can use the field name", function () {
		expect(
			precompile({
				args: [],
				message: "oh no, a {field}",
				field: "test",
			})({ rule: "test" })
		).toEqual("oh no, a test");
	});

	it("can use the rule name", function () {
		expect(
			precompile({
				args: [],
				message: "oh no, a {rule}",
				field: "test42",
			})({ rule: "test" })
		).toEqual("oh no, a test");
	});

	it("removes unknown interpolation key", function () {
		expect(
			precompile({
				args: [],
				message: "str {mlakzjdml}",
				field: "test",
			})({ rule: "test" })
		).toEqual("str ");
	});
});
