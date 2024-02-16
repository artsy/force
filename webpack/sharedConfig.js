// @ts-check

import path from "path"
import TerserPlugin from "terser-webpack-plugin"
import { basePath } from "./webpackEnv"

export const productionDevtool = "source-map"
export const devtool = process.env.WEBPACK_DEVTOOL || "eval"
export const mode = process.env.NODE_ENV
export const stats = process.env.WEBPACK_STATS || "errors-only"

export const experiments = {
  lazyCompilation: {
    entries: false,
    imports: false,
  },
}

export const cache = {
  cacheDirectory: path.resolve(process.cwd(), ".cache"),
  idleTimeout: 5000,
  type: "filesystem", // or 'memory'
}

export const minimizer = [
  new TerserPlugin({
    // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
    parallel: process.env.CI ? 4 : true,
  }),
]

export const resolve = {
  alias: {
    // The following packages need to be resolved to the host app (force) to get
    // around issues involving `yarn link` and multiple instances. A  similar
    // configuration has been setup for SSR in `src/dev`, via `require-control`.
    "styled-components": require.resolve("styled-components"),
    "react/jsx-runtime": require.resolve("react/jsx-runtime"),
    "lodash-es": "lodash",
  },
  extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json"],
  modules: [path.resolve(basePath, "src"), "node_modules"],
  symlinks: false,
}

export const externals = {
  // Required because the cacheMiddleware include redis
  redis: "redis",
  // TODO: Needs research to determine if if this is still required
  request: "request",
  // Required because getAsyncStorage isn't using async import()
  async_hooks: "async_hooks",
}
