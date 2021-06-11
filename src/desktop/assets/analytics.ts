import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { trackPageView } from "lib/analytics/trackPageView"
window.Cookies = require("cookies-js")

// We exclude these routes from analytics.page calls because
// they're already tracked in v2/System/Analytics/trackingMiddleware
const excludedRoutes = [
  "/art-fairs",
  "/artist(.*)",
  "/artists",
  "/artwork(.*)",
  "/auctions(.*)",
  "/auction-faq",
  "/auction-registration(2)?/:saleID",
  "/auction/:saleID/bid(2)?/:artworkID",
  "/campaign(.*)",
  "/collect(.*)",
  "/collection(.*)",
  "/collections(.*)",
  "/consign(.*)",
  "/fair(.*)",
  "/feature(.*)",
  "/identity-verification(.*)",
  "/orders(.*)",
  "/search(.*)",
  "/show/(.*)",
  "/user/conversations(.*)",
  "/user/purchases(.*)",
  "/viewing-room(.*)",
  "/user/payments(.*)",
]

beforeAnalyticsReady()
trackPageView(excludedRoutes)

document.addEventListener("DOMContentLoaded", () => {
  // @ts-expect-error STRICT_NULL_CHECK
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
