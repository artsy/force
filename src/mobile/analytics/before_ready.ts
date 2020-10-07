import { data as sd } from "sharify"
import { reportLoadTimeToVolley } from "lib/volley"
import { OwnerType } from "@artsy/cohesion"
import { getPageTypeFromClient } from "lib/getPageType"

//
// Analytics code that needs to run before page load and analytics.ready
//

const { pageType } = getPageTypeFromClient()

// Disable Parsely firing on non-article/section pages
if (pageType !== OwnerType.article) {
  window.PARSELY = { autotrack: false }
}

const properties = { path: location.pathname }

if (pageType === OwnerType.artwork) {
  properties["acquireable"] = sd.ARTWORK.is_acquireable
  properties["availability"] = sd.ARTWORK.availability
  properties["price_listed"] = sd.ARTWORK.price && sd.ARTWORK.price.length > 0
}

// Track pageview
window.analytics.page(properties, { integrations: { Marketo: false } })

// Track pageload speed
if (
  window.performance &&
  window.performance.timing &&
  sd.TRACK_PAGELOAD_PATHS
) {
  window.addEventListener("load", function () {
    if (sd.TRACK_PAGELOAD_PATHS.split("|").includes(pageType)) {
      window.setTimeout(function () {
        let deviceType = sd.IS_MOBILE ? "mobile" : "desktop"
        reportLoadTimeToVolley(pageType, deviceType)
      }, 0)
    }
  })
}
