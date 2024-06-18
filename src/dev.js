require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx", ".ejs"],
  plugins: ["babel-plugin-dynamic-import-node"],
})
require("@artsy/multienv").loadEnvs(".env.shared", ".env")

const express = require("express")
const path = require("path")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const { startServer } = require("./Server/startServer")
const { setAliases } = require("require-control")
const { createReloadable } = require("@artsy/express-reloadable")
const { initializeMiddleware } = require("./middleware")
const {
  clientDevelopmentConfig,
} = require("../webpack/envs/clientDevelopmentConfig")

/**
 * Force resolution of potentially `yarn link`'d modules to the local i
 * node_modules folder. This gets around SSR issues involving single react
 * context requirements, amongst other things. This is server-side only.
 * Client-side must be resolved via webpack.
 */
setAliases({
  react: path.resolve(path.join(__dirname, "../node_modules/react")),
  "react/jsx-runtime": path.resolve(
    path.join(__dirname, "../node_modules/react/jsx-runtime")
  ),
  "react-dom": path.resolve(path.join(__dirname, "../node_modules/react-dom")),
  "styled-components": path.resolve(
    path.join(__dirname, "../node_modules/styled-components")
  ),
})

const webpackConfig = clientDevelopmentConfig()
const compiler = webpack(webpackConfig)
const app = express()

const wdm = webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  serverSideRender: true,
  stats: webpackConfig.stats,
  writeToDisk(filePath) {
    /**
     * Emit the stats file to disk during dev so that loadable-compoents can
     * read in which each webpack chunk and load split bundles correctly.
     *
     * @see https://github.com/artsy/reaction/blob/master/src/Artsy/Router/serverRouter.tsx
     */
    return (
      /loadable-stats/.test(filePath) ||
      /manifest/.test(filePath) ||
      /\.ejs/.test(filePath)
    )
  },
})

// Mount webpack dev middleware
app.use(wdm)

// Mount hot loader. Note that react-fast-refresh automatically taps into this.
app.use(
  webpackHotMiddleware(compiler, {
    log: false,
  })
)

// Mount middleware
initializeMiddleware(app)

const mountAndReload = createReloadable(app, require)

// Mount express-reloadable on app
mountAndReload(path.resolve("src/server.ts"), {
  watchModules: [path.resolve(process.cwd(), "src")],
})

// Start server
startServer(app)

// Listen for exit and close processes
process.on("SIGTERM", () => {
  console.log("Stopping dev server.")
  wdm.close()
})
