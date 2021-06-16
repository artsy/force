// @ts-check

import path from "path"
import TerserPlugin from "terser-webpack-plugin"
import { basePath, env } from "../utils/env"

export const standardDevtool = env.webpackDevtool || "eval"

export const productionDevtool = env.webpackDevtool || "source-map"

export const standardMode = env.webpackDebug ? "development" : env.nodeEnv

export const standardStats = env.webpackStats || "errors-only"

// The standard minimization config to production.
export const standardMinimizer = [
  new TerserPlugin({
    parallel: env.onCi ? env.webpackCiCpuLimit : true, // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
  }),
]

// The standard resolve configuration used everywhere.
export const standardResolve = {
  alias: {
    "jquery.ui.widget": "blueimp-file-upload/js/vendor/jquery.ui.widget.js",

    // The following packages need to be resolved to the host app (force) to get
    // around issues involving `yarn link` and multiple instances. A  similar
    // configuration has been setup for SSR in `src/index`, via `require-control`.
    "styled-components": require.resolve("styled-components"),
    react: require.resolve("react"),
  },
  extensions: [
    ".mjs",
    ".js",
    ".jsx",
    ".ts",
    ".tsx",
    ".json",
    ".jade",
    ".coffee",
  ],
  fallback: {
    buffer: require.resolve("buffer/"),
    os: require.resolve("os-browserify/browser"),
    path: false,
  },
  // Symlink issues should be fixed via `yarn --pnp`
  modules: [path.resolve(basePath, "src"), "node_modules"],
  symlinks: false,
}

export const clientExternals = {
  // Required because the cacheMiddleware include redis
  redis: "redis",
  // TODO: Needs research to determine if if this is still required
  request: "request",
  // Required because getAsyncStorage isn't using async import()
  async_hooks: "async_hooks",
}
