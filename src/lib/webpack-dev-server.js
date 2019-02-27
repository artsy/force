import express from "express"
import webpack from "webpack"
import webpackConfig from "../../webpack"

const app = (module.exports = express())
const compiler = webpack(webpackConfig)

app.use(
  require("webpack-hot-middleware")(compiler, {
    log: false,
  })
)

app.use(
  require("webpack-dev-middleware")(compiler, {
    quiet: true,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: "errors-only",
  })
)
