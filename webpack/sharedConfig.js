// @ts-check

const path = require("path")
const TerserPlugin = require("terser-webpack-plugin")
const { basePath } = require("./webpackEnv")

const productionDevtool = "source-map"
const devtool = process.env.WEBPACK_DEVTOOL || "eval"
const mode = process.env.NODE_ENV
const stats = process.env.WEBPACK_STATS || "errors-only"

const experiments = {
  lazyCompilation: {
    entries: false,
    imports: false,
  },
}

const minimizer = [
  new TerserPlugin({
    // Only use 4 cpus (default) in CircleCI, by default it will try using 36 and OOM
    parallel: process.env.CI ? 4 : true,
  }),
]

const resolve = {
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

const externals = {
  // TODO: Needs research to determine if if this is still required
  request: "request",
  // Required because getAsyncStorage isn't using async import()
  async_hooks: "async_hooks",
}

module.exports = {
  productionDevtool,
  devtool,
  mode,
  stats,
  experiments,
  minimizer,
  resolve,
  externals,
}
