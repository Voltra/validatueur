import { isNone, none, noneIf } from "@/api/types";

describe("isNone", function () {
	it("is true for none", function () {
		expect(isNone(none)).toBeTruthy();
	});

	it("is false for other values", function () {
		[
			0,
			NaN,
			null,
			false,
			[],
			{},
			new Date(),
			new RegExp(""),
		].forEach(value => expect(isNone(value)).toBeFalsy());
	});
});

describe("noneIf", function () {
	it("resolves to the value if the condition is true", function () {
		[0, 42, "str", NaN].forEach(value =>
			expect(noneIf(true, value)).resolves.toStrictEqual(value)
		);
	});

	it("rejects to none if the condition is false", function () {
		[0, 42, "str", NaN].forEach(value =>
			expect(noneIf(false, value)).rejects.toStrictEqual(none)
		);
	});
});
