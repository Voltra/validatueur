const { defaults } = require("jest-config");

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	testRegex: "\.test\.ts$",
	moduleFileExtensions: [
		...defaults.moduleFileExtensions,
		"ts",
		"tsx",
	],
	collectCoverage: true,
};
