// @ts-check

import MomentTimezoneDataPlugin from "moment-timezone-data-webpack-plugin"
import LodashModuleReplacementPlugin from "lodash-webpack-plugin"
import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin"
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import webpack from "webpack"
import { env } from "../utils/env"

const currentYear = new Date().getFullYear()

export const sharedPlugins = () => [
  new LodashModuleReplacementPlugin({
    collections: true,
    currying: true,
    flattening: true,
    guards: true,
    shorthands: true,
  }),
  // To include only specific zones, use the matchZones option
  new MomentTimezoneDataPlugin({
    matchZones: /^America\/New_York/,
  }),

  // To keep all zones but limit data to specific years, use the year range options
  new MomentTimezoneDataPlugin({
    startYear: currentYear - 5,
    endYear: currentYear + 5,
  }),

  new NodePolyfillPlugin(),

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
