const { webpackEnv } = require("./webpack/webpackEnv")

module.exports = {
  cacheDirectory: ".cache/jest",
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^luxon$": "<rootDir>/node_modules/luxon",
    "^react$": "<rootDir>/node_modules/react",
  },
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: [
    "<rootDir>/src/Utils/jestShim.js",
    "<rootDir>/src/tests.ts",
  ],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/**/*.jest.(ts|tsx|js|jsx)"],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  transform: {
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform",
    "(ts|tsx|js|jsx)$": "babel-jest",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  workerIdleMemoryLimit: "500MB",
}
