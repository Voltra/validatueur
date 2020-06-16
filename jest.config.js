const { defaults } = require("jest-config");

module.exports = {
	preset: "ts-jest",
	clearMocks: true,
	testEnvironment: "node",
	testRegex: "\.test\.ts$",
	moduleFileExtensions: [
		...defaults.moduleFileExtensions,
		"ts",
		"tsx",
	],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1"
	},
	collectCoverage: true,
};
