import type { Config } from "jest";

const config: Config = {
  displayName: {
    name: "@core",
    color: "blue",
  },
  clearMocks: true,
  coverageDirectory: "<rootDir>/../__coverage",
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  rootDir: "src",
  setupFilesAfterEnv: [
    "./shared/domain/tests/validations.ts",
    "./shared/domain/tests/jest.ts"
  ],
  testRegex: [".*\\..*spec\\.ts$"],
  transform: {
    "^.+\\.ts?$": "@swc/jest",
  },
};

export default config;
