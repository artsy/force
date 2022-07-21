module.exports = {
  cacheDirectory: ".cache/jest",
  displayName: "jest",
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx"],
  moduleNameMapper: {
    "^luxon$": "<rootDir>/node_modules/luxon",
    "^react$": "<rootDir>/node_modules/react",
  },
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.envSetup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/**/*.jest.(ts|tsx)"],
  testURL: "http://localhost",
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "(ts|tsx|js|jsx)$": "babel-jest",
  },
}
