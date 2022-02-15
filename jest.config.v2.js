module.exports = {
  projects: [
    {
      cacheDirectory: ".cache/jest",
      collectCoverage: true,
      coverageDirectory: "./coverage/",
      coverageReporters: ["lcov", "text-summary"],
      displayName: "v2",
      moduleDirectories: ["node_modules", "<rootDir>/src/v2"],
      moduleFileExtensions: ["coffee", "js", "json", "jsx", "ts", "tsx"],
      moduleNameMapper: {
        "^luxon$": "<rootDir>/node_modules/luxon",
        "^react$": "<rootDir>/node_modules/react",
      },
      reporters: ["default", "jest-junit"],
      setupFilesAfterEnv: ["<rootDir>/src/v2/jest.envSetup.ts"],
      testEnvironment: "jest-environment-jsdom",
      testMatch: ["**/src/v2/**/*.jest.(ts|tsx)"],
      testURL: "http://localhost",
      transform: {
        "\\.(gql|graphql)$": "jest-transform-graphql",
        "^.+\\.coffee$":
          "<rootDir>/node_modules/jest-coffee-preprocessor/index.js",
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
      },
    },
  ],
}
