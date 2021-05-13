import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { trackPageView } from "lib/analytics/trackPageView"
window.Cookies = require("cookies-js")

beforeAnalyticsReady()
trackPageView()

document.addEventListener("DOMContentLoaded", () => {
  // @ts-expect-error STRICT_NULL_CHECK
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
