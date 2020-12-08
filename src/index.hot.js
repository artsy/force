require("dotenv/config")
require("coffeescript/register")
require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
})

// Workaround until more appropriate methods for generating an individual config
// are implemented.
process.env.AUTO_CONFIGURE = true

const express = require("express")
const glob = require("glob")
const path = require("path")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const { createConfig } = require("../webpack/index")

const clientNovoConfig = createConfig("novo.dev")
const clientForceConfig = createConfig("force.dev")

const stylusMiddleware = require("stylus").middleware

function startServer() {
  const compiler = webpack([clientNovoConfig, clientForceConfig])

  const app = express()

  // Stylus dev assets. TODO: Compile to public folder.
  glob
    .sync(`${__dirname}/{public,{desktop,mobile}/**/public}`)
    .forEach(folder => {
      app.use(express.static(folder))
    })

  app.use(
    stylusMiddleware({
      dest: path.resolve(__dirname, "../desktop/public"),
      src: path.resolve(__dirname, "../desktop"),
    })
  )
  app.use(
    stylusMiddleware({
      dest: path.resolve(__dirname, "../mobile/public"),
      src: path.resolve(__dirname, "../mobile"),
    })
  )

  const wdm = webpackDevMiddleware(compiler, {
    publicPath: clientForceConfig.output.publicPath,
    quiet: true,
    serverSideRender: true,
    stats: clientForceConfig.stats,
    writeToDisk(filePath) {
      /**
       * Emit the stats file to disk during dev so that loadable-compoents can
       * read in which each webpack chunk and load split bundles correctly.
       *
       * @see https://github.com/artsy/reaction/blob/master/src/Artsy/Router/buildServerApp.tsx
       */
      return (
        /loadable-stats/.test(filePath) ||
        /loadable-novo-stats/.test(filePath) ||
        /manifest/.test(filePath) ||
        /\.ejs/.test(filePath) ||
        /\.css/.test(filePath)
      )
    },
  })

  app.use(wdm)
  app.use(
    webpackHotMiddleware(compiler, {
      log: false,
    })
  )

  const server = app.listen(3001, "localhost", err => {
    if (err) {
      console.error(err)
      return
    }

    // eslint-disable-next-line no-console
    console.log("Listening on localhost:3001")
  })

  process.on("SIGTERM", () => {
    // eslint-disable-next-line no-console
    console.log("Stopping dev server.")
    wdm.close()
    server.close(() => {
      process.exit(0)
    })
  })
}

;(() => {
  startServer()
})()
