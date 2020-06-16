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
	it("resolves to the value if the condition is true", async function () {
		const data = [0, 42, "str", NaN];

		for (const value of data) {
			const res = await noneIf(true, value);
			expect(res).toStrictEqual(value);
		}
	});

	it("rejects to none if the condition is false", async function () {
		const data = [0, 42, "str", NaN];
		expect.assertions(data.length);

		for (const value of data) {
			try {
				await noneIf(false, value);
			} catch (e) {
				expect(e).toStrictEqual(none);
			}
		}
	});
});
