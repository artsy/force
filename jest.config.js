const sharedConfig = {
  transform: {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    "^.+\\.coffee$": "<rootDir>/node_modules/jest-coffee-preprocessor/index.js",
    ".(ts|tsx|js|jsx)": "babel-jest",
  },
  cacheDirectory: ".cache/jest",
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  coverageReporters: ["lcov", "text-summary"],
  reporters: ["default", "jest-junit"],
  moduleFileExtensions: ["coffee", "js", "json", "jsx", "ts", "tsx"],
}

module.exports = {
  projects: [
    /**
     * Config for wider force, excluding src/v2 directory
     */
    {
      ...sharedConfig,
      modulePathIgnorePatterns: ["v2"],
      testRegex: ".*\\.jest\\.(ts|tsx|js|jsx)$",
      setupFiles: ["<rootDir>/test.config.js"],
      roots: ["<rootDir>/src"],
      testURL: "https://artsy.net",
    },
    // Config for src/v2 (former Reaction code)
    {
      ...sharedConfig,
      testMatch: ["**/src/v2/**/*.jest.(ts|tsx)"],
      moduleDirectories: ["node_modules", "<rootDir>/src/v2"],
      setupFilesAfterEnv: ["<rootDir>/src/v2/jest.envSetup.ts"],
      testURL: "http://localhost",
      moduleNameMapper: {
        "^luxon$": "<rootDir>/node_modules/luxon",
        "^react$": "<rootDir>/node_modules/react",
      },
    },
  ],
}
