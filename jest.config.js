const tsPreset = require('ts-jest/jest-preset');
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

const jestConfig = {
  rootDir: '.',
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,jsx}', '!src/**/*.d.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)x?$',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'types\\.ts',
    '.+\\.d\\.ts',
    '/src/app/graphql',
    '/src/app/utils/graphql',
    '/src/app/routes',
    '/src/app.ts',
    '/src/index.ts',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>',
  }),
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
}

module.exports = Object.assign({}, tsPreset, jestConfig);