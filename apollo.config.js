const path = require("path")
const {
  config,
  directivesFile,
  includesGlobPattern,
} = require("vscode-apollo-relay").generateConfig()

module.exports = {
  client: {
    ...config.client,
    includes: [
      directivesFile,
      path.join("./src", includesGlobPattern(["ts", "tsx"])),
    ],
    excludes: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  },
}
