import superSync from "backbone-super-sync"
import { API_REQUEST_TIMEOUT, DEFAULT_CACHE_TIME } from "../config"
import Backbone from "backbone"
import artsyXapp from "@artsy/xapp"
import { cache } from "./cache"

export function backboneSync() {
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
