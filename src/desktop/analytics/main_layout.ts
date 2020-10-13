//
// Analytics for the main layout. This includes buttons in the header, footer
// or any other actions that occur on each page.
//

import { data as sd } from "sharify"
import { reportLoadTimeToVolley } from "lib/volley"
import { match } from "path-to-regexp"
import { timeOnPageListener } from "./timeOnPageListener"
import { getPageTypeFromClient } from "lib/getPageType"
import { OwnerType } from "@artsy/cohesion"

// We exclude these routes from analytics.page calls because they're already
// taken care of in Reaction.
const excludedRoutes = [
  "/artist(.*)",
  "/artwork(.*)",
  "/auction-faq",
  "/auction/:saleID/bid(2)?/:artworkID",
  "/auction-registration(2)?/:saleID",
  "/campaign(.*)",
  "/collect(.*)",
  "/collection(.*)",
  "/collections(.*)",
  "/fair(.*)",
  "/feature(.*)",
  "/identity-verification(.*)",
  "/orders(.*)",
  "/search(.*)",
  "/viewing-room(.*)",
  "/user/conversations(.*)",
  "/user/purchases(.*)",
]

// Track pageview
const pathname = new URL(window.location.href).pathname
const { pageType, pageSlug } = getPageTypeFromClient()

const foundExcludedPath = excludedRoutes.some(excludedPath => {
  const matcher = match(excludedPath, { decode: decodeURIComponent })
  const foundMatch = !!matcher(pathname)
  return foundMatch
})

if (!foundExcludedPath) {
  window.analytics.page(
    { path: pathname },
    { integrations: { Marketo: false } }
  )
}

if (pageType === OwnerType.sale) {
  // Let reaction track reaction-based app routes
  const matcher = match("/auction/:saleID/bid(2)?/:artworkID", {
    decode: decodeURIComponent,
  })
  const matchedBidRoute = matcher(pathname)
  if (!matchedBidRoute) {
    window.addEventListener("load", function () {
      // distinct event required for marketing integrations (Criteo)
      window.analytics.track("Auction Pageview", { auction_slug: pageSlug })
    })
  }
}

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

// FIXME: Move this to reaction
class PageTimeTracker {
  path: string
  delay: number
  description: string
  timer: any

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
    this.timer = timeOnPageListener()
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
]
