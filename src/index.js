require("source-map-support").install()
require("regenerator-runtime/runtime")
require("./lib/DOMParser")

const {
  APP_URL,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  PORT,
  KEEPALIVE_TIMEOUT_SECONDS,
  HEADERS_TIMEOUT_SECONDS,
  PROFILE_MEMORY,
} = process.env

const chalk = require("chalk")
console.log(chalk.green(`\n[Force] NODE_ENV=${NODE_ENV}\n`))

if (NODE_ENV === "development") {
  require("coffeescript/register")
  require("@babel/register")({
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    plugins: ["babel-plugin-dynamic-import-node"],
  })
}

// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
require("./lib/datadog")

const path = require("path")
const { setAliases } = require("require-control")

// Force resolution of potentially `yarn link`'d modules to the local node_modules
// folder. This gets around SSR issues involving single react context requirements,
// amongst other things. This is server-side only. Client-side must be resolved
// via webpack.
setAliases({
  react: path.resolve(path.join(__dirname, "../node_modules/react")),
  "react-dom": path.resolve(path.join(__dirname, "../node_modules/react-dom")),
  "styled-components": path.resolve(
    path.join(__dirname, "../node_modules/styled-components")
  ),
})

const artsyXapp = require("@artsy/xapp")
const cache = require("./lib/cache")
const { setup: relayCacheSetup } = require("./lib/cacheClient")
const express = require("express")
const once = require("lodash").once
const setup = require("./lib/setup").default
const http = require("http")
const withGracefulShutdown = require("http-shutdown")

const app = (module.exports = express())

if (PROFILE_MEMORY) {
  require("./lib/memory_profiler")()
}

const startServer = once(() => {
  if (module === require.main) {
    const message =
      NODE_ENV === "development"
        ? `\n\n  [Force] Booting on port ${PORT}... \n`
        : `\n\n  [Force] Started on ${APP_URL}. \n`

    const server = withGracefulShutdown(http.createServer(app))

    const stopServer = once(() => {
      server.shutdown(() => {
        console.log("Closed existing connections.")
        process.exit(0)
      })
    })

    if (KEEPALIVE_TIMEOUT_SECONDS) {
      console.log(
        "Setting keepAliveTimeout to " + KEEPALIVE_TIMEOUT_SECONDS + " sec."
      )
      server.keepAliveTimeout = Number(KEEPALIVE_TIMEOUT_SECONDS) * 1000
    }

    if (HEADERS_TIMEOUT_SECONDS) {
      console.log(
        "Setting headersTimeout to " + HEADERS_TIMEOUT_SECONDS + " sec."
      )
      server.headersTimeout = Number(HEADERS_TIMEOUT_SECONDS) * 1000
    }

    server.listen(PORT, "0.0.0.0", () => console.log(message))

    process.on("SIGTERM", stopServer)
  }
})

const initCache = cb => {
  cache.setup(() => relayCacheSetup(cb))
}

// Connect to Redis
initCache(() => {
  // Add all of the middleware and global setup
  setup(app)

  // If we can't get an xapp token, start the server
  // but retry every 30 seconds. Until an xapp token is fetched,
  // the `ARTSY_XAPP_TOKEN` sharify value will not be present,
  // and any requests made via the Force server (or a user's browser)
  // directly to gravity will fail.
  //
  // When an xapp token is fetched, any subsequent requests to Force
  // will have `ARTSY_XAPP_TOKEN` set and direct gravity requests will
  // resolve.
  artsyXapp.on("error", err => {
    startServer()
    console.error(`
Force could not fetch an xapp token. This can be
due to \`API_URL\`, \`CLIENT_ID\` and \`CLIENT_SECRET\` not being set, but
also could be gravity being down. Retrying...`)
    console.error(err)
    setTimeout(() => {
      artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET })
    }, 30000)
  })

  // Get an xapp token
  artsyXapp.init(
    { url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET },
    err => {
      if (!err) {
        console.log("Successfully fetched xapp token.")
        startServer()
      }
    }
  )
})
