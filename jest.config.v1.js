module.exports = {
  projects: [
    /**
     * Config for wider force, excluding src/v2 directory
     */
    {
      transform: {
        "\\.(gql|graphql)$": "jest-transform-graphql",
        "^.+\\.coffee$":
          "<rootDir>/node_modules/jest-coffee-preprocessor/index.js",
        ".(ts|tsx|js|jsx)": "babel-jest",
      },
      cacheDirectory: ".cache/jest",
      coverageDirectory: "./coverage/",
      collectCoverage: true,
      coverageReporters: ["lcov", "text-summary"],
      reporters: ["default", "jest-junit"],
      moduleFileExtensions: ["coffee", "js", "json", "jsx", "ts", "tsx"],
      displayName: "v1",
      testPathIgnorePatterns: ["<rootDir>/src/v2"],
      testRegex: ".*\\.jest\\.(ts|tsx|js|jsx)$",
      setupFiles: ["<rootDir>/test.config.js"],
      roots: ["<rootDir>/src"],
      testURL: "https://artsy.net",
    },
  ],
}
