import { beforeAnalyticsReady, onAnalyticsReady } from "lib/analytics/helpers"
import { trackPageView } from "lib/analytics/trackPageView"
window.Cookies = require("cookies-js")

beforeAnalyticsReady()
trackPageView()

document.addEventListener("DOMContentLoaded", () => {
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
