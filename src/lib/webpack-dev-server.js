import express from "express"
import webpack from "webpack"
import webpackConfig from "../../webpack"

export const app = express()
const compiler = webpack(webpackConfig)

app.use(
  require("webpack-hot-middleware")(compiler, {
    log: false,
  })
)

app.use(
  require("webpack-dev-middleware")(compiler, {
    quiet: true,
    stats: webpackConfig.stats,
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk(filePath) {
      /**
       * Emit the stats file to disk during dev so that loadable-compoents can
       * read in which each webpack chunk and load split bundles correctly.
       *
       * @see https://github.com/artsy/reaction/blob/master/src/Artsy/Router/buildServerApp.tsx
       */
      return /loadable-stats/.test(filePath) || /manifest/.test(filePath)
    },
  })
)
