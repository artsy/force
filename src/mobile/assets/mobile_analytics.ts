import {
  beforeAnalyticsReady,
  onAnalyticsReady,
} from "desktop/analytics/helpers"
import { trackPageView } from "desktop/analytics/trackPageView"
window.Cookies = require("cookies-js")

beforeAnalyticsReady()
trackPageView()

document.addEventListener("DOMContentLoaded", () => {
  window.analytics.ready(() => {
    onAnalyticsReady()
  })
})
