const swcConfig = require("./.swcrc.js")
const { webpackEnv } = require("./webpack/webpackEnv")

if (webpackEnv.experimentalSWCCompiler) {
  console.log("[jest.config.js] Experimental SWC Compiler is enabled.\n")
}

module.exports = {
  cacheDirectory: ".cache/jest",
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^luxon$": "<rootDir>/node_modules/luxon",
    "^react$": "<rootDir>/node_modules/react",
    "react-i18next": "<rootDir>/src/DevTools/mockReactI18n",
  },
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: ["<rootDir>/src/tests.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/**/*.jest.(ts|tsx|js|jsx)"],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  transform: {
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform",
    "(ts|tsx|js|jsx)$": webpackEnv.experimentalSWCCompiler
      ? ["@swc/jest", swcConfig]
      : "babel-jest",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  workerIdleMemoryLimit: "500MB",
}
