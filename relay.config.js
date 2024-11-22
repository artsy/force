module.exports = {
  src: "./src",
  schema: "./data/schema.graphql",
  language: "typescript",
  artifactDirectory: "./src/__generated__",
  // persistOutput: "./data/complete.queryMap.json",
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  persistConfig: {
    file: "./data/persistedQueries.json",
    algorithm: "MD5",
  },
}
