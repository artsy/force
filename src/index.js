/* eslint-disable no-console */
// TODO: Does source map support provide additional server side value?
import "source-map-support/register"

// TODO: Is the regenerator runtime still required?
import "regenerator-runtime/runtime"

// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
import "./lib/datadog"

import { once } from "lodash"
import express from "express"
import http from "http"
import withGracefulShutdown from "http-shutdown"
import { initialize } from "./common-app"

const app = express()
const commonApp = initialize(once(startServer))
app.use(commonApp)

// Run start server as a callback for now until waiting on the xapp token and
// cache have a chance to be refactored.
function startServer() {
  const message =
    process.env.NODE_ENV === "development"
      ? `\n\n  [Force] Booting on port ${process.env.PORT}... \n`
      : `\n\n  [Force] Started on ${process.env.APP_URL}. \n`

  const server = withGracefulShutdown(http.createServer(app))

  const stopServer = once(() => {
    server.shutdown(() => {
      console.log("Closed existing connections.")
      process.exit(0)
    })
  })

  if (process.env.KEEPALIVE_TIMEOUT_SECONDS) {
    console.log(
      "Setting keepAliveTimeout to " +
        process.env.KEEPALIVE_TIMEOUT_SECONDS +
        " sec."
    )
    server.keepAliveTimeout =
      Number(process.env.KEEPALIVE_TIMEOUT_SECONDS) * 1000
  }

  if (process.env.HEADERS_TIMEOUT_SECONDS) {
    console.log(
      "Setting headersTimeout to " +
        process.env.HEADERS_TIMEOUT_SECONDS +
        " sec."
    )
    server.headersTimeout = Number(process.env.HEADERS_TIMEOUT_SECONDS) * 1000
  }

  server.listen(process.env.PORT, "0.0.0.0", () => console.log(message))

  process.on("SIGTERM", stopServer)
}

module.exports = app
