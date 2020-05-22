module.exports = {
  projects: [
    /**
     * Config for wider force, excluding src/v2 directory
     */
    {
      transform: {
        "^.+\\.coffee$":
          "<rootDir>/node_modules/jest-coffee-preprocessor/index.js",
        ".(ts|tsx|js|jsx)": "babel-jest",
        "\\.graphql$": "jest-raw-loader",
      },
      coverageDirectory: "./coverage/",
      collectCoverage: true,
      coverageReporters: ["lcov", "text-summary"],
      reporters: ["default", "jest-junit"],
      moduleFileExtensions: ["coffee", "js", "json", "jsx", "ts", "tsx"],
      modulePathIgnorePatterns: ["v2"],
      testRegex: ".*\\.jest\\.(ts|tsx|js|jsx)$",
      setupFiles: ["<rootDir>/test.jest.envSetup.js"],
      roots: ["<rootDir>/src"],
      testURL: "https://artsy.net",
    },
    // Config for src/v2 (former Reaction code)
    {
      transform: {
        "^.+\\.coffee$":
          "<rootDir>/node_modules/jest-coffee-preprocessor/index.js",
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
        "\\.graphql$": "jest-raw-loader",
      },
      coverageDirectory: "coverage",
      coverageReporters: ["lcov", "text-summary"],
      collectCoverage: true,
      cacheDirectory: ".cache/jest",
      reporters: ["default", "jest-junit"],
      moduleFileExtensions: ["coffee", "js", "json", "jsx", "ts", "tsx"],
      testMatch: ["**/src/v2/**/*.jest.(ts|tsx)"],
      // testRegex: ".*\\.jest\\.(ts|tsx|js|jsx)$",
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
