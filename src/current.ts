import artsyXapp from "@artsy/xapp"
import Backbone from "backbone"
import express from "express"
import superSync from "backbone-super-sync"
import cache from "./lib/cache"
import { setup as relayCacheSetup } from "./lib/cacheClient"
import setup from "./lib/setup"
import config from "./config"

const { API_REQUEST_TIMEOUT, DEFAULT_CACHE_TIME } = config

const { API_URL, CLIENT_ID, CLIENT_SECRET } = process.env

const app = express()

function initializeCache(cb) {
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

export function initializeForce(startServerCallback) {
  // TODO: Should we still hold off the server spin up until after the cache is loaded?
  // Connect to Redis

  Promise.all([
    new Promise(resolve => {
      initializeCache(() => resolve())
    }),
    new Promise(resolve => {
      swapBackboneSync()

      // Add all of the middleware and global setup
      setup(app)
      resolve()
    }),
    new Promise(resolve => {
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
        resolve()
        console.error(`
    Force could not fetch an xapp token. This can be
    due to \`API_URL\`, \`CLIENT_ID\` and \`CLIENT_SECRET\` not being set, but
    also could be gravity being down. Retrying...`)
        console.error(err)
        setTimeout(() => {
          artsyXapp.init({ id: CLIENT_ID, secret: CLIENT_SECRET, url: API_URL })
        }, 30000)
      })

      // Get an xapp token
      artsyXapp.init(
        { id: CLIENT_ID, secret: CLIENT_SECRET, url: API_URL },
        err => {
          if (!err) {
            // eslint-disable-next-line no-console
            console.log("[Force] Successfully fetched xapp token.")
            resolve()
          }
        }
      )
    }),
  ]).then(() => {
    startServerCallback()
  })

  return app
}
