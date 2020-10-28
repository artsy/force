import artsyXapp from "@artsy/xapp"
import Backbone from "backbone"
import chalk from "chalk"
import express from "express"
import path from "path"
import superSync from "backbone-super-sync"
import cache from "./lib/cache"
import { setup as relayCacheSetup } from "./lib/cacheClient"
import setup from "./lib/setup"
import config from "./config"

const { API_REQUEST_TIMEOUT, DEFAULT_CACHE_TIME } = config

const {
  APP_URL,
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  NODE_ENV,
  PORT,
  KEEPALIVE_TIMEOUT_SECONDS,
  HEADERS_TIMEOUT_SECONDS,
} = process.env

// eslint-disable-next-line no-console
console.log(chalk.green(`\n[Force] NODE_ENV=${NODE_ENV}\n`))

const app = express()

const initCache = cb => {
  cache.setup(() => relayCacheSetup(cb))
}

function swapBackboneSync() {
  // Override Backbone to use server-side sync, inject the XAPP token,
  // add redis caching, and timeout for slow responses.
  superSync.timeout = API_REQUEST_TIMEOUT
  superSync.cacheClient = cache.client
  superSync.defaultCacheTime = DEFAULT_CACHE_TIME
  Backbone.sync = function (method, model, options) {
    if (options.headers == null) {
      options.headers = {}
    }
    options.headers["X-XAPP-TOKEN"] = artsyXapp.token || ""
    return superSync(method, model, options)
  }
}

// TODO: Should we still hold off the server spin up until after the cache is loaded?
// Connect to Redis
initCache(() => {
  swapBackboneSync()

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
        // eslint-disable-next-line no-console
        console.log("Successfully fetched xapp token.")
        // startServer()
      }
    }
  )
})

module.exports = app
