// @ts-check

import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin"
import { EarlyHintsPlugin } from "./plugins/EarlyHintsPlugin"
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import rspack from "@rspack/core"

export const sharedPlugins = () => [
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

  new RetryChunkLoadPlugin({
    maxRetries: 5,
    cacheBust: `function() {
      return "cache-bust=" + Date.now();
    }`,
  }),

  new EarlyHintsPlugin(),
]
