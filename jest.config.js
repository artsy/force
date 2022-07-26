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
  },
  reporters: ["default", "jest-junit"],
  setupFilesAfterEnv: ["<rootDir>/src/tests.ts"],
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/src/**/*.jest.(ts|tsx)"],
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  transform: {
<<<<<<< HEAD
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform",
    "(ts|tsx|js|jsx)$": "babel-jest",
=======
    "\\.(gql|graphql)$": "jest-transform-graphql",
<<<<<<< HEAD
    "(ts|tsx|js|jsx)$": [
      "@swc/jest",
      {
        jsc: {
          experimental: {
            plugins: [
              [
                "@swc/plugin-relay",
                {
                  language: "typescript",
                  schema: "data/schema.graphql",
                  rootDir: __dirname,
                  src: "src",
                  artifactDirectory: "./src/__generated__",
                },
              ],
            ],
          },
          parser: {
            decorators: true,
            dynamicImport: true,
            syntax: "typescript",
            tsx: true,
          },
          transform: {
            react: {
              runtime: "automatic",
            },
          },
        },
      },
    ],
>>>>>>> fix graphql invocation
=======
    "(ts|tsx|js|jsx)$": webpackEnv.experimentalSWCCompiler
      ? ["@swc/jest", swcConfig]
      : "babel-jest",
>>>>>>> feat(webpack): Add SWC compilation support
  },
}
