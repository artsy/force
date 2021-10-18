import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { trackPageView } from "lib/analytics/trackPageView"
import { getRouteConfig } from "v2/System/Router/getRouteConfig"

window.Cookies = require("cookies-js")

const { routePaths } = getRouteConfig()

// We exclude these routes from analytics.page calls because
// they're already tracked in v2/System/Analytics/trackingMiddleware
const excludedRoutes = routePaths

beforeAnalyticsReady()
trackPageView(excludedRoutes)

document.addEventListener("DOMContentLoaded", () => {
  // @ts-expect-error STRICT_NULL_CHECK
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
