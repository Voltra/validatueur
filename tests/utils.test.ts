import {
	isEmpty,
	asStr,
	isValue,
	trim,
	contains,
	asNumber,
	asDate,
	now,
	RegularExpressions,
} from "@/utils";
import { generateSequence, range } from "sequency";
import moment from "moment";

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
		["str", "je suis là", "yolo", ""].forEach(e => expect(trim(e)).toBe(e));
	});

	it("should remove leading whitespace", function () {
		[
			[" str", "str"],
			["  str str", "str str"],
		].forEach(([value, expected]) => expect(trim(value)).toBe(expected));
	});

	it("should remove trailing whitespace", function () {
		[
			["str  ", "str"],
			["str str    ", "str str"],
		].forEach(([value, expected]) => expect(trim(value)).toBe(expected));
	});
});

describe("contains", function () {
	it("finds the value if there", function () {
		[[[2], 2]].forEach(([arr, value]) =>
			expect(contains(<any[]>arr, value)).toBeTruthy()
		);
	});

	it("does not do weird conversions", function () {
		[
			[[""], []],
			[[[]], ""],

			[[[""]], ""],
			[[""], [""]],

			[[false], []],
			[[[]], false],

			[[false], ""],
			[[""], false],

			[[false], 0],
			[[0], false],

			[[true], 1],
			[[1], true],

			[[[0]], 0],
			[[0], [0]],

			[[[""]], 0],
			[[0], [""]],
		].forEach(([arr, value]) =>
			expect(contains(<any[]>arr, value)).toBeFalsy()
		);
	});

	it("does not find the value if not present", function () {
		[[[], true]].forEach(([arr, value]) =>
			expect(contains(<any[]>arr, value)).toBeFalsy()
		);
	});
});

describe("asNumber", function () {
	it("gives back the argument if it's aleady a number", function () {
		[7, 69.42, NaN].forEach(e => expect(asNumber(e)).toBe(e));
	});

	it("converts floats as floats", function () {
		[["69.42", 69.42]].forEach(([str, expected]) =>
			expect(asNumber(str)).toBe(expected)
		);
	});

	it("converts ints as ints", function () {
		[
			["42", 42],
			["69", 69],
			["420", 420],
		].forEach(([str, expected]) => expect(asNumber(str)).toBe(expected));
	});

	it("gives back NaN on non numbers", function () {
		[
			"this is not a number",
			"and so is this",
			"still not a number",
			"at least i hope",
		].forEach(value => expect(asNumber(value)).toBe(NaN));
	});
});

describe("asDate", function () {
	it("parses Date objects", function () {
		[
			new Date(),
			new Date(98, 11, 15),
			new Date("December 15, 1998"),
		].forEach(date => {
			const mdate = asDate(date);
			expect(mdate.isValid()).toBeTruthy();
			expect(mdate.toDate()).toStrictEqual(date);
		});
	});

	it("parses Date utilities", function () {
		[
			[Date.now(), undefined],
			// [Date(), moment.RFC_2822], // no longer supported
		].forEach(([date, fmt]: any[]) => {
			const mdate = asDate(date, fmt);
			expect(mdate.isValid()).toBeTruthy();
			expect(mdate.toDate()).toStrictEqual(new Date(date));
		});
	});

	it("can handle user defined formats", function () {
		[
			["15/12/1998", "DD/MM/YYYY"],
			["15/12/1998 21:00", "DD/MM/YYYY HH:mm"],
			["12 1998 15", "MM YYYY DD"],
			["12 00 1998 21 15", "MM mm YYYY HH DD"],
		].forEach(([str, fmt]) =>
			expect(asDate(str, fmt).isValid()).toBeTruthy()
		);
	});

	it("can handle predefined momentjs formats", function () {
		[
			["1998-12-15T21:00:00", moment.ISO_8601],
			["2017-12-14T16:34", moment.HTML5_FMT.DATETIME_LOCAL],
			["2017-12-14T16:34:10", moment.HTML5_FMT.DATETIME_LOCAL_SECONDS],
			["2017-12-14T16:34:10.234", moment.HTML5_FMT.DATETIME_LOCAL_MS],
			["2017-12-14", moment.HTML5_FMT.DATE],
			["16:34", moment.HTML5_FMT.TIME],
			["16:34:10", moment.HTML5_FMT.TIME_SECONDS],
			["16:34:10.234", moment.HTML5_FMT.TIME_MS],
			["2017-W50", moment.HTML5_FMT.WEEK],
			["2017-12", moment.HTML5_FMT.MONTH],
		].forEach(([str, fmt]) =>
			expect(asDate(str, fmt).isValid()).toBeTruthy()
		);
	});

	it("fails to parse invalid input (moment instance is invalid)", function () {
		["2016 aze", "invalid date lmao", "2016-12-24 random"].forEach(date =>
			expect(asDate(date).isValid()).toBeFalsy()
		);
	});

	it("fails to parse input that does not match the format (moment instance is invalid)", function () {
		[
			["2016-12-24", "YYYY/MM/DD"],
			["24/12/2016", "MM/DD/YYYY"],
		].forEach(([str, fmt]) =>
			expect(asDate(str, fmt).isValid()).toBeFalsy()
		);
	});
});

describe("now", function () {
	it("gives the current date", function () {
		const nnow = now();
		const ndate = new Date();

		expect(nnow.isValid()).toBeTruthy();

		expect(nnow.endOf("day").toDate()).toStrictEqual(
			moment(ndate).endOf("day").toDate()
		);
	});
});

describe("RegularExpressions", function () {
	describe(".digit", function () {
		const re = RegularExpressions.digit;

		it("matches on strings containing digit(s)", function () {
			["123", "aze123", "a4e"].forEach(str =>
				expect(re.test(str)).toBeTruthy()
			);
		});

		it("fails on strings that do not contain digit(s)", function () {
			["no digits here"].forEach(str => expect(re.test(str)).toBeFalsy());
		});
	});
});
