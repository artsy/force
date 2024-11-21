const swcConfig = require("./.swcrc.js")
const { webpackEnv } = require("./webpack/webpackEnv")

module.exports = {
  cacheDirectory: ".cache/jest",
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^luxon$": "<rootDir>/node_modules/luxon",
    "^@artsy/fresnel$": "fresnel-17",
    "^react$": "react-17",
    "^react-dom$": "react-dom-17",
    "^react-dom/test-utils$": "react-dom-17/test-utils",
  },
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: [
    "<rootDir>/src/Utils/jestShim.js",
    "<rootDir>/src/Utils/tests.legacy.ts",
  ],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/**/*.jest.enzyme.(ts|tsx|js|jsx)"],
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
