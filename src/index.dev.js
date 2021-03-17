require("dotenv/config")
require("coffeescript/register")
require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
})

// Workaround until more appropriate methods for generating an individual config
// are implemented.
process.env.AUTO_CONFIGURE = true

// Force resolution of potentially `yarn link`'d modules to the local node_modules
// folder. This gets around SSR issues involving single react context requirements,
// amongst other things. This is server-side only. Client-side must be resolved
// via webpack.
const { setAliases } = require("require-control")

const express = require("express")
const path = require("path")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const { createConfig } = require("../webpack/index")

setAliases({
  react: path.resolve(path.join(__dirname, "../node_modules/react")),
  "react-dom": path.resolve(path.join(__dirname, "../node_modules/react-dom")),
  "styled-components": path.resolve(
    path.join(__dirname, "../node_modules/styled-components")
  ),
})

const clientNovoConfig = createConfig("novo.dev")
const clientForceConfig = createConfig("force.dev")

const force = require("./common-app")

function startServer() {
  const compiler = webpack(
    [clientNovoConfig, clientForceConfig],
    (err, stats) => {
      if (err) {
        console.error(err)
        return
      }

      console.log(
        stats.toString({
          chunks: false, // Makes the build much quieter
          colors: true, // Shows colors in the console
        })
      )
    }
  )

  const app = express()
  const wdm = webpackDevMiddleware(compiler, {
    serverSideRender: true,
    // stats: clientForceConfig.stats,
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
        /\.ejs/.test(filePath)
      )
    },
  })

  force.initialize(() => {})

  app.use(wdm)
  app.use(
    webpackHotMiddleware(compiler, {
      // log: false,
      // noInfo: true,
    })
  )
  app.use(force)

  const server = app.listen(5000, "localhost", err => {
    if (err) {
      console.error(err)
      return
    }

    // eslint-disable-next-line no-console
    console.log("Listening on localhost:5000")
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
