//
// Analytics code that needs to run before page load and analytics.ready
//

import { data as sd } from "sharify"
import { reportLoadTimeToVolley } from "lib/volley"

// Disable Parsely firing on non-article/section pages
if (!location.pathname.match(/^\/article/)) {
  window.PARSELY = { autotrack: false }
}

const pageType = window.sd.PAGE_TYPE || window.location.pathname.split("/")[1]
var properties = { path: location.pathname }

if (pageType == "artwork") {
  properties["acquireable"] = sd.ARTWORK.is_acquireable
  properties["availability"] = sd.ARTWORK.availability
  properties["price_listed"] = sd.ARTWORK.price && sd.ARTWORK.price.length > 0
}

// Track pageview
analytics.page(properties, { integrations: { Marketo: false } })

// Track pageload speed
if (
  window.performance &&
  window.performance.timing &&
  sd.TRACK_PAGELOAD_PATHS
) {
  window.addEventListener("load", function () {
    if (sd.TRACK_PAGELOAD_PATHS.split("|").includes(pageType)) {
      window.setTimeout(function () {
        const {
          requestStart,
          loadEventEnd,
          domComplete,
        } = window.performance.timing

        reportLoadTimeToVolley(
          requestStart,
          loadEventEnd,
          domComplete,
          pageType,
          "mobile"
        )
      }, 0)
    }
  })
}
