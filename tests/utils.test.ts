import { isEmpty, asStr, isValue, trim, contains } from "@/utils";
import { generateSequence, range } from "sequency";

describe("isEmpty", function () {
	it("is true on the empty string", function () {
		expect(isEmpty("")).toBeTruthy();
	});

	it("is true on strings that only contain whitespace", function () {
		const generator = () => generateSequence(() => " ");

		range(1, 100)
			.map(i => generator().take(i))
			.map(stream => stream.toArray().join(""))
			.forEach(str => expect(isEmpty(str)).toBeTruthy());
	});

	it("is false on strings that start with whitespace", function () {
		["  str", " str", "   str"].forEach(s =>
			expect(isEmpty(s)).toBeFalsy()
		);
	});

	it("is false on strings that end with whitespace", function () {
		["str ", "str  ", "str   "].forEach(s =>
			expect(isEmpty(s)).toBeFalsy()
		);
	});

	it("is false on strings that contain whitespace", function () {
		["str str", "str  str", "str   str str   str"].forEach(s =>
			expect(isEmpty(s)).toBeFalsy()
		);
	});
});

describe("asStr", function () {
	it("returns the parameter if it's already a string", function () {
		["string stuff", ""].forEach(s => expect(asStr(s)).toBe(s));
	});

	it("should use its string repr (by interpolation, or toString) for other types", function () {
		[
			69,
			4.2,
			{},
			[],
			undefined,
			null,
			NaN,
			new Date(),
			true,
			false,
		].forEach(value => {
			if (value === null || value === undefined)
				expect(asStr(value)).toBe(`${value}`);
			else expect(asStr(value)).toBe(value.toString());
		});
	});
});

describe("isValue", function () {
	it("is true for 0, false, null and NaN", function () {
		[0, false, null, NaN].forEach(e => expect(isValue(e)).toBeTruthy());
	});

	it("is false for undefined, empty string and functions", function () {
		[undefined, "", function () {}].forEach(e =>
			expect(isValue(e)).toBeFalsy()
		);
	});

	it("is true for for values", function () {
		[2, new Date(), "string", 4.2, true, [], {}].forEach(e =>
			expect(isValue(e)).toBeTruthy()
		);
	});
});

describe("trim", function () {
	it("should not change strings that do not end with (or start with) whitespace(s)", function () {
		[
			"str",
			"je suis là",
			"yolo",
			"",
		].forEach(e => expect(trim(e)).toBe(e));
	});

	it("should remove leading whitespace", function(){
		[
			[" str", "str"],
			["  str str", "str str"]
		].forEach(([value, expected]) => expect(trim(value)).toBe(expected));
	});

	it("should remove trailing whitespace", function(){
		[
			["str  ", "str"],
			["str str    ", "str str"],
		].forEach(([value, expected]) => expect(trim(value)).toBe(expected));
	});
});

describe("contains", function(){
	it("finds the value if there", function(){
		[
			[[2], 2]
		].forEach(([arr, value]) => expect(contains(<any[]>arr, value)).toBeTruthy());
	});

	it("does not do weird conversions", function(){
		[
			[ [""], [] ],
			[ [[]], "" ],

			[ [[""]], "" ],
			[ [""], [""] ],

			[ [false], [] ],
			[ [[]], false ],

			[ [false], "" ],
			[ [""], false ],

			[ [false], 0 ],
			[ [0], false ],

			[ [true], 1 ],
			[ [1], true ],

			[ [[0]], 0 ],
			[ [0], [0] ],

			[ [[""]], 0 ],
			[ [0], [""] ],
		].forEach(([arr, value]) => expect(contains(<any[]>arr, value)).toBeFalsy());
	});
});
