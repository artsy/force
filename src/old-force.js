/* eslint-disable no-console */
// TODO: Do we still need this.
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

// This must come before any other instrumented module.
// See https://docs.datadoghq.com/tracing/languages/nodejs/ for more info.
require("./lib/datadog")

const path = require("path")
const artsyXapp = require("@artsy/xapp")
const cache = require("./lib/cache")
const { setup: relayCacheSetup } = require("./lib/cacheClient")
const express = require("express")
const once = require("lodash").once
const setup = require("./lib/setup").default

const app = express()
module.exports = app

if (PROFILE_MEMORY) {
  require("./lib/memory_profiler")()
}

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
    // startServer()
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
        // startServer()
      }
    }
  )
})
