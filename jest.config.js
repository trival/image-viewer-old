module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node', // default: "jsdom"
	moduleDirectories: ['node_modules', 'lib'],
	testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
}
