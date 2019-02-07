import express from "express"
import webpack from "webpack"
import path from "path"

const app = (module.exports = express())
const config = require(path.join(__dirname, "../../", "webpack"))
const compiler = webpack(config)

app.use(
  require("webpack-hot-middleware")(compiler, {
    log: false,
  })
)

app.use(
  require("webpack-dev-middleware")(compiler, {
    quiet: true,
    publicPath: config.output.publicPath,
    serverSideRender: true,
    stats: "errors-only",
  })
)
