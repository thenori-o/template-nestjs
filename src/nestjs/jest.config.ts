import { Config } from 'jest';

const config: Config = {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: [".*\\..*spec\\.ts$"],
  transform: {
    "^.+\\.ts?$": "@swc/jest",
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@fc/core/(.*)$': '<rootDir>/../../../node_modules/@fc/core/dist/$1',
    '#shared/(.*)$': '<rootDir>/../../../node_modules/@fc/core/dist/shared/$1',
  },
  setupFilesAfterEnv: [
    "../../@core/src/shared/domain/tests/jest.ts"
  ],
};

export default config;