const nextJest = require('next/jest')

const createJestConfig = nextJest({dir: './'})

const config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testRegex: '.*\\.test\\.(ts|tsx)$',
}

module.exports = createJestConfig(config)
