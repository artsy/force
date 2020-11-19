import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { trackPageView } from "lib/analytics/trackPageView"
window.Cookies = require("cookies-js")

beforeAnalyticsReady()
trackPageView()

document.addEventListener("DOMContentLoaded", () => {
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
