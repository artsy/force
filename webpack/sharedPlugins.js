// @ts-check

import { RetryChunkLoadPlugin } from "webpack-retry-chunk-load-plugin"
import WorkboxPlugin from "workbox-webpack-plugin"
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import webpack from "webpack"
import path from "path"

export const sharedPlugins = () => [
  new NodePolyfillPlugin(),

  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
  }),
  // Remove server-only modules from client bundles
  // TODO: Why would these end up in the client bundle?
  new webpack.IgnorePlugin({ resourceRegExp: /^graphql(\/.*)?$/ }),

  new RetryChunkLoadPlugin({
    maxRetries: 5,
    cacheBust: `function() {
      return "cache-bust=" + Date.now();
    }`,
  }),
  new WorkboxPlugin.GenerateSW({
    swDest: path.resolve(process.cwd(), "public/service-worker.js"),
    // These options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:html|css|js)$/,
        handler: "StaleWhileRevalidate",
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "images",
          expiration: {
            maxEntries: 300,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          },
        },
      },
    ],
  }),
]
