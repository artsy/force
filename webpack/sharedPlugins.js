// @ts-check

// const { RetryChunkLoadPlugin } = require("webpack-retry-chunk-load-plugin")
const { EarlyHintsPlugin } = require("./plugins/EarlyHintsPlugin")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const rspack = require("@rspack/core")

const sharedPlugins = () => [
  new NodePolyfillPlugin(),

  new rspack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new rspack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  // Remove server-only modules from client bundles
  // TODO: Why would these end up in the client bundle?
  new rspack.IgnorePlugin({ resourceRegExp: /^graphql(\/.*)?$/ }),

  new EarlyHintsPlugin(),
]

module.exports = { sharedPlugins }
