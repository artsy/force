//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

import { data as sd } from "sharify"
import { reportLoadTimeToVolley } from "lib/volley"

// Track pageview
const pageType = window.sd.PAGE_TYPE || window.location.pathname.split("/")[1]
var properties = { path: location.pathname }

if (pageType == "artwork") {
  properties["acquireable"] = sd.ARTWORK.is_acquireable
  properties["offerable"] = sd.ARTWORK.is_offerable
  properties["availability"] = sd.ARTWORK.availability
  properties["price_listed"] = sd.ARTWORK.price && sd.ARTWORK.price.length > 0

  if (sd.ARTWORK.is_acquireable || sd.ARTWORK.is_in_auction) {
    window.addEventListener("load", function() {
      // marketing requirement for dynamic retargeting
      window.analytics.track("Viewed Product", { id: sd.ARTWORK._id })
    })
  }
}

// We exclude these routes from analytics.page calls because they're already
// taken care of in Reaction.
// FIXME: When new artwork page is fully rolled out, and goes back to an
// `artwork` page type, remove `new-artwork` from here.
const excludedRoutes = ["orders", "new-artwork"]
if (!excludedRoutes.includes(pageType)) {
  analytics.page(properties, { integrations: { Marketo: false } })
}

// Track pageload speed
if (
  window.performance &&
  window.performance.timing &&
  sd.TRACK_PAGELOAD_PATHS
) {
  window.addEventListener("load", function() {
    if (sd.TRACK_PAGELOAD_PATHS.split("|").includes(pageType)) {
      window.setTimeout(function() {
        var deviceType = sd.IS_MOBILE ? "mobile" : "desktop"
        reportLoadTimeToVolley(pageType, deviceType)
      }, 0)
    }
  })
}

class PageTimeTracker {
  constructor(path, delay, description) {
    this.path = path
    this.delay = delay
    this.description = description
    this.timer = null
    this.track()
  }

  setPath(newPath) {
    this.path = newPath
  }

  track() {
    this.timer = setTimeout(() => {
      window.analytics.track("Time on page", {
        category: this.description,
        message: this.path,
      })
    }, this.delay)
  }

  clear() {
    if (this.timer) clearTimeout(this.timer)
  }

  reset(newPath = null) {
    this.clear()
    if (newPath) this.setPath(newPath)
    this.track()
  }
}

window.desktopPageTimeTrackers = [
  new PageTimeTracker(sd.CURRENT_PATH, 15000, "15 seconds"),
  new PageTimeTracker(sd.CURRENT_PATH, 30000, "30 seconds"),
  new PageTimeTracker(sd.CURRENT_PATH, 60000, "1 minute"),
  new PageTimeTracker(sd.CURRENT_PATH, 180000, "3 minutes"),
]

// debug tracking calls
if (sd.SHOW_ANALYTICS_CALLS) {
  analytics.on("track", function() {
    console.info("TRACKED: ", arguments[0], JSON.stringify(arguments[1]))
  })
}

if (sd.SHOW_ANALYTICS_CALLS) {
  analyticsHooks.on("all", function(name, data) {
    console.info("ANALYTICS HOOK: ", name, data)
  })
}
