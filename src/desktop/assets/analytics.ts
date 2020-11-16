import {
  beforeAnalyticsReady,
  onAnalyticsReady,
} from "desktop/analytics/helpers"
import { trackPageView } from "desktop/analytics/trackPageView"
window.Cookies = require("cookies-js")

import { data as sd } from "sharify"

// We exclude these routes from analytics.page calls because
// they're already tracked in v2/Artsy/Analytics/trackingMiddleware
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

if (sd.ENABLE_SHOW_UPDATE) {
  excludedRoutes.push("/show(.*)")
}

beforeAnalyticsReady()
trackPageView(excludedRoutes)

document.addEventListener("DOMContentLoaded", () => {
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
