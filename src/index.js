/* eslint-disable no-console */
// TODO: Do we still need this.
import 'source-map-support/register'

// Do we still use regenerator?
import "regenerator-runtime/runtime"

// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
import "./lib/datadog"

// TODO: Do we need JSDOM server-side?
import "./lib/DOMParser"

// TODO: Publish artsy morgan as an npm module.
import logger from "artsy-morgan"
import express from "express"

const {
  NODE_ENV,
} = process.env

const isDevelopment = NODE_ENV === "development"

const app = express()

// TODO: Refactor dev server to exist in index.dev.js
if (isDevelopment) {
  app.use(require("./lib/webpack-dev-server").app)

  const mountAndReload = createReloadable(novo, require)
  mountAndReload(path.resolve("src/common-app"))
} else {
  app.use(require("./common-app"))
}

app.listen(5000, () => {
  const bootMessage = true
    ? `\n[App] Booting Global Force...  \n`
    : `\n[App] Started on http://localhost:5000  \n`

  // eslint-disable-next-line no-console
  console.log(bootMessage)
})

// const once = require("lodash").once
// const http = require("http")
// const withGracefulShutdown = require("http-shutdown")
// const startServer = once(() => {
//   if (module === require.main) {
//     const message =
//       NODE_ENV === "development"
//         ? `\n\n  [Force] Booting on port ${PORT}... \n`
//         : `\n\n  [Force] Started on ${APP_URL}. \n`

//     const server = withGracefulShutdown(http.createServer(app))

//     const stopServer = once(() => {
//       server.shutdown(() => {
//         console.log("Closed existing connections.")
//         process.exit(0)
//       })
//     })

//     if (KEEPALIVE_TIMEOUT_SECONDS) {
//       console.log(
//         "Setting keepAliveTimeout to " + KEEPALIVE_TIMEOUT_SECONDS + " sec."
//       )
//       server.keepAliveTimeout = Number(KEEPALIVE_TIMEOUT_SECONDS) * 1000
//     }

//     if (HEADERS_TIMEOUT_SECONDS) {
//       console.log(
//         "Setting headersTimeout to " + HEADERS_TIMEOUT_SECONDS + " sec."
//       )
//       server.headersTimeout = Number(HEADERS_TIMEOUT_SECONDS) * 1000
//     }

//     server.listen(PORT, "0.0.0.0", () => console.log(message))

//     process.on("SIGTERM", stopServer)
//   }
// })
