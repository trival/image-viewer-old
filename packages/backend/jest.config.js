module.exports = {
	preset: 'ts-jest',
	runner: '@jest-runner/electron/main',
	testEnvironment: 'node',
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
}
