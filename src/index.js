require("source-map-support").install()
require("regenerator-runtime/runtime")
require("@artsy/reaction/dist/Polyfills/DOMParser")

const {
  APP_URL,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  PORT,
  KEEPALIVE_TIMEOUT,
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
// folder. This gets around SSR issues involving single react context requirements.
// This is server-side only. Client-side must be resolved via webpack.
setAliases({
  react: path.resolve(path.join(__dirname, "../node_modules/react")),
  "react-dom": path.resolve(path.join(__dirname, "../node_modules/react-dom")),
  "styled-components": path.resolve(
    path.join(__dirname, "../node_modules/styled-components")
  ),
})

global.Promise = require("bluebird")

const artsyXapp = require("artsy-xapp")
const cache = require("./lib/cache.coffee")
const express = require("express")
const setup = require("./lib/setup").default

const app = (module.exports = express())

if (PROFILE_MEMORY) {
  require("./lib/memory_profiler")()
}

// Connect to Redis
cache.setup(() => {
  // Add all of the middleware and global setup
  setup(app)

  // if we can't get an xapp token, just exit and let the whole system try
  // again - this prevents a sustained broken state when gravity returns a
  // 502 during force startup.
  artsyXapp.on("error", err => {
    console.error(`
Could not start Force because it could not set up the xapp token, this is likely
due to \`API_URL\`, \`CLIENT_ID\` and \`CLIENT_SECRET\` not being set, but
also could be gravity being down.`)
    console.error(err)
    process.exit()
  })

  // Get an xapp token
  artsyXapp.init({ url: API_URL, id: CLIENT_ID, secret: CLIENT_SECRET }, () => {
    // Start the server
    if (module === require.main) {
      const message =
        NODE_ENV === "development"
          ? `\n\n  [Force] Booting on port ${PORT}... \n`
          : `\n\n  [Force] Started on ${APP_URL}. \n`

      const server = app.listen(PORT, "0.0.0.0", () => console.log(message))
      if (KEEPALIVE_TIMEOUT) {
        console.log("Setting keepAliveTimeout to " + KEEPALIVE_TIMEOUT + " ms")
        server.keepAliveTimeout = Number(KEEPALIVE_TIMEOUT)
      }
    }
  })
})
