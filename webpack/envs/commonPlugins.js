// @ts-check

import webpack from "webpack"
import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin"
import { env } from "../utils/env"

export const standardPlugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(env.nodeEnv),
    },
  }),
  // Remove moment.js localization files
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  // Remove server-only modules from client bundles
  // TODO: Why would these end up in the client bundle?
  new webpack.IgnorePlugin({ resourceRegExp: /^graphql(\/.*)?$/ }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    jade: "jade/runtime.js",
    waypoints: "jquery-waypoints/waypoints.js",
  }),

  new RetryChunkLoadPlugin({
    maxRetries: 5,
    cacheBust: `function() {
      return "cache-bust=" + Date.now();
    }`,
  }),
]
